#!/usr/bin/env node

const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const fs = require('fs');
const axios = require('axios');

// Load wallet
function loadWallet() {
  try {
    const walletPath = './wallet.json';
    
    if (fs.existsSync(walletPath)) {
      const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
      return Keypair.fromSecretKey(new Uint8Array(walletData));
    } else {
      console.log('❌ Wallet not found. Please run the main app first to generate a wallet.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error loading wallet:', error);
    process.exit(1);
  }
}

async function getTestSOL() {
  const wallet = loadWallet();
  const walletAddress = wallet.publicKey.toString();
  
  console.log('🔑 Wallet Address:', walletAddress);
  console.log('');
  
  // Check current balance
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const balance = await connection.getBalance(wallet.publicKey);
  console.log('💰 Current Balance:', (balance / 1e9).toFixed(4), 'SOL');
  console.log('');
  
  if (balance > 0.1 * 1e9) {
    console.log('✅ You already have sufficient SOL for testing!');
    return;
  }
  
  console.log('🔄 Attempting to get test SOL...');
  console.log('');
  
  // Try multiple methods
  const methods = [
    {
      name: 'Solana CLI Airdrop',
      action: async () => {
        const signature = await connection.requestAirdrop(wallet.publicKey, 2 * 1e9);
        await connection.confirmTransaction(signature);
        return signature;
      }
    },
    {
      name: 'Web Faucet API',
      action: async () => {
        const response = await axios.post('https://api.devnet.solana.com', {
          jsonrpc: '2.0',
          id: 1,
          method: 'requestAirdrop',
          params: [walletAddress, 2 * 1e9]
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.data.error) {
          throw new Error(response.data.error.message);
        }
        
        const signature = response.data.result;
        await connection.confirmTransaction(signature);
        return signature;
      }
    }
  ];
  
  for (const method of methods) {
    try {
      console.log(`🔄 Trying ${method.name}...`);
      const signature = await method.action();
      console.log(`✅ ${method.name} successful!`);
      console.log('📋 Transaction Signature:', signature);
      
      // Check new balance
      const newBalance = await connection.getBalance(wallet.publicKey);
      console.log('💰 New Balance:', (newBalance / 1e9).toFixed(4), 'SOL');
      console.log('');
      
      return;
    } catch (error) {
      console.log(`❌ ${method.name} failed:`, error.message);
      console.log('');
    }
  }
  
  console.log('❌ All automated methods failed.');
  console.log('');
  console.log('💡 Manual Solutions:');
  console.log('1. Visit https://faucet.solana.com/');
  console.log('2. Enter your wallet address:', walletAddress);
  console.log('3. Request 2 SOL');
  console.log('4. Wait for confirmation');
  console.log('');
  console.log('🔗 Alternative Faucets:');
  console.log('- https://solfaucet.com/');
  console.log('- https://faucet.quicknode.com/solana/devnet');
  console.log('- https://www.testnetfaucet.org/');
  console.log('');
  console.log('⏰ Rate limits reset every 24 hours');
}

// Run the script
getTestSOL().catch(console.error);
