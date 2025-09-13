const { Connection, PublicKey, Keypair, Transaction, SystemProgram } = require('@solana/web3.js');
const { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, getAccount } = require('@solana/spl-token');
const anchor = require('@coral-xyz/anchor');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

class NFTService {
  constructor() {
    this.connection = new Connection(process.env.RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
    this.programId = new PublicKey(process.env.ANCHOR_PROGRAM_ID || 'DDnZChV4nH945pGZtCtojVq8jztZxFN6VYMeoBKmxE4t');
    this.wallet = this.loadWallet();
    this.program = null;
    this.initializeProgram();
  }

  loadWallet() {
    try {
      // In production, load from environment variable or secure key management
      const walletPath = process.env.WALLET_PATH || './wallet.json';
      
      if (fs.existsSync(walletPath)) {
        const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
        return Keypair.fromSecretKey(new Uint8Array(walletData));
      } else {
        // Generate a new wallet for development
        const newWallet = Keypair.generate();
        fs.writeFileSync(walletPath, JSON.stringify(Array.from(newWallet.secretKey)));
        console.log('Generated new wallet:', newWallet.publicKey.toString());
        return newWallet;
      }
    } catch (error) {
      console.error('Error loading wallet:', error);
      throw error;
    }
  }

  async initializeProgram() {
    try {
      // Load the IDL (Interface Definition Language)
      const idlPath = path.join(__dirname, '../anchor/target/idl/anchor.json');
      
      if (fs.existsSync(idlPath)) {
        const idl = JSON.parse(fs.readFileSync(idlPath, 'utf8'));
        
        const provider = new anchor.AnchorProvider(
          this.connection,
          new anchor.Wallet(this.wallet),
          { commitment: 'confirmed' }
        );
        
        this.program = new anchor.Program(idl, this.programId, provider);
        console.log('Anchor program initialized successfully');
      } else {
        console.warn('IDL file not found. Some features may not work.');
      }
    } catch (error) {
      console.error('Error initializing program:', error);
    }
  }

  async getWalletBalance() {
    try {
      const balance = await this.connection.getBalance(this.wallet.publicKey);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      throw error;
    }
  }

  async requestAirdrop(amount = 2) {
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempting airdrop (attempt ${attempt}/${maxRetries})...`);
        
        // Try the primary RPC first
        const signature = await this.connection.requestAirdrop(
          this.wallet.publicKey,
          amount * 1e9 // Convert SOL to lamports
        );
        
        await this.connection.confirmTransaction(signature);
        console.log('Airdrop successful:', signature);
        return signature;
      } catch (error) {
        console.error(`Airdrop attempt ${attempt} failed:`, error.message);
        
        // If it's a rate limit error and we have retries left, wait and try again
        if (error.message.includes('429') || error.message.includes('rate limit') || error.message.includes('Too Many Requests')) {
          if (attempt < maxRetries) {
            console.log(`Rate limited. Waiting ${retryDelay * attempt}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
            continue;
          }
        }
        
        // If all retries failed, try alternative methods
        if (attempt === maxRetries) {
          console.log('Primary airdrop failed. Trying alternative methods...');
          return await this.requestAirdropAlternative(amount);
        }
      }
    }
  }

  async requestAirdropAlternative(amount = 2) {
    const alternativeMethods = [
      () => this.requestAirdropFromQuickNode(amount),
      () => this.requestAirdropFromHelius(amount),
      () => this.requestAirdropFromWebFaucet(amount)
    ];

    for (const method of alternativeMethods) {
      try {
        console.log('Trying alternative airdrop method...');
        const result = await method();
        if (result) {
          console.log('Alternative airdrop successful');
          return result;
        }
      } catch (error) {
        console.error('Alternative airdrop method failed:', error.message);
        continue;
      }
    }
    
    throw new Error('All airdrop methods failed. Please try manually using https://faucet.solana.com/');
  }

  async requestAirdropFromQuickNode(amount = 2) {
    try {
      // QuickNode alternative RPC
      const quickNodeConnection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const signature = await quickNodeConnection.requestAirdrop(
        this.wallet.publicKey,
        amount * 1e9
      );
      await quickNodeConnection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      throw new Error(`QuickNode airdrop failed: ${error.message}`);
    }
  }

  async requestAirdropFromHelius(amount = 2) {
    try {
      // Note: This requires a Helius API key
      const heliusApiKey = process.env.HELIUS_API_KEY;
      if (!heliusApiKey) {
        throw new Error('Helius API key not configured');
      }
      
      const heliusConnection = new Connection(`https://devnet.helius-rpc.com/?api-key=${heliusApiKey}`, 'confirmed');
      const signature = await heliusConnection.requestAirdrop(
        this.wallet.publicKey,
        amount * 1e9
      );
      await heliusConnection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      throw new Error(`Helius airdrop failed: ${error.message}`);
    }
  }

  async requestAirdropFromWebFaucet(amount = 2) {
    try {
      // Use the web faucet API
      const response = await axios.post('https://api.devnet.solana.com', {
        jsonrpc: '2.0',
        id: 1,
        method: 'requestAirdrop',
        params: [this.wallet.publicKey.toString(), amount * 1e9]
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.error) {
        throw new Error(response.data.error.message);
      }

      const signature = response.data.result;
      await this.connection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      throw new Error(`Web faucet airdrop failed: ${error.message}`);
    }
  }

  async mintNFT(imagePath, metadata) {
    try {
      if (!this.program) {
        throw new Error('Anchor program not initialized');
      }

      // Generate a new mint keypair
      const mintKeypair = Keypair.generate();
      const mintAddress = mintKeypair.publicKey;

      // Get the associated token account address
      const associatedTokenAccount = await getAssociatedTokenAddress(
        mintAddress,
        this.wallet.publicKey
      );

      // Check if the associated token account exists
      let associatedTokenAccountInfo;
      try {
        associatedTokenAccountInfo = await getAccount(this.connection, associatedTokenAccount);
      } catch (error) {
        // Account doesn't exist, we'll create it in the transaction
        associatedTokenAccountInfo = null;
      }

      // Create the mint NFT instruction
      const mintNftIx = await this.program.methods
        .mintNft()
        .accounts({
          payer: this.wallet.publicKey,
          mint: mintAddress,
          associatedTokenAccount: associatedTokenAccount,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .instruction();

      // Create transaction
      const transaction = new Transaction();

      // Add instruction to create associated token account if it doesn't exist
      if (!associatedTokenAccountInfo) {
        const createATAInstruction = createAssociatedTokenAccountInstruction(
          this.wallet.publicKey, // payer
          associatedTokenAccount, // associated token account
          this.wallet.publicKey, // owner
          mintAddress // mint
        );
        transaction.add(createATAInstruction);
      }

      // Add the mint NFT instruction
      transaction.add(mintNftIx);

      // Set recent blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = this.wallet.publicKey;

      // Sign the transaction
      transaction.sign(this.wallet, mintKeypair);

      // Send the transaction
      const signature = await this.connection.sendTransaction(transaction, [
        this.wallet,
        mintKeypair
      ]);

      // Wait for confirmation
      await this.connection.confirmTransaction(signature);

      console.log('NFT minted successfully:', {
        mintAddress: mintAddress.toString(),
        signature: signature,
        associatedTokenAccount: associatedTokenAccount.toString()
      });

      return {
        mintAddress: mintAddress.toString(),
        signature: signature,
        associatedTokenAccount: associatedTokenAccount.toString(),
        metadata: metadata
      };

    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    }
  }

  async getNFTDetails(mintAddress) {
    try {
      const mintPubkey = new PublicKey(mintAddress);
      
      // Get mint account info
      const mintInfo = await this.connection.getAccountInfo(mintPubkey);
      
      if (!mintInfo) {
        throw new Error('Mint account not found');
      }

      // Get associated token account
      const associatedTokenAccount = await getAssociatedTokenAddress(
        mintPubkey,
        this.wallet.publicKey
      );

      // Get token account info
      const tokenAccountInfo = await getAccount(this.connection, associatedTokenAccount);

      return {
        mintAddress: mintAddress,
        supply: mintInfo.data.readUInt32LE(36), // Read supply from mint account data
        decimals: mintInfo.data.readUInt8(44), // Read decimals from mint account data
        associatedTokenAccount: associatedTokenAccount.toString(),
        amount: tokenAccountInfo.amount.toString(),
        owner: tokenAccountInfo.owner.toString()
      };

    } catch (error) {
      console.error('Error getting NFT details:', error);
      throw error;
    }
  }

  async getWalletNFTs() {
    try {
      // Get all token accounts for the wallet
      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
        this.wallet.publicKey,
        { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
      );

      const nfts = [];
      
      for (const account of tokenAccounts.value) {
        const accountData = account.account.data.parsed.info;
        
        // Only include accounts with 1 token (NFTs)
        if (accountData.tokenAmount.amount === '1' && accountData.tokenAmount.decimals === 0) {
          nfts.push({
            mintAddress: accountData.mint,
            amount: accountData.tokenAmount.amount,
            owner: accountData.owner
          });
        }
      }

      return nfts;

    } catch (error) {
      console.error('Error getting wallet NFTs:', error);
      throw error;
    }
  }
}

module.exports = NFTService;
