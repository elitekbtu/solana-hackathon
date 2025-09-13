const express = require('express');
const multer = require('multer');
const cors = require('cors');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const NFTService = require('./nftService');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize NFT service
const nftService = new NFTService();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Solana configuration
const ANCHOR_PROGRAM_ID = "DDnZChV4nH945pGZtCtojVq8jztZxFN6VYMeoBKmxE4t";
const RPC_URL = "https://api.devnet.solana.com";

// Import Solana libraries
const { Connection, PublicKey, Keypair, Transaction } = require('@solana/web3.js');
const { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } = require('@solana/spl-token');

// Initialize connection
const connection = new Connection(RPC_URL, 'confirmed');

// Helper function to upload image to IPFS (using Pinata as example)
async function uploadToIPFS(imageBuffer, metadata) {
  try {
    // In a real application, you would use a service like Pinata, IPFS, or Arweave
    // For this example, we'll simulate the upload
    const ipfsHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    // In production, you would:
    // 1. Upload the image to IPFS
    // 2. Upload the metadata JSON to IPFS
    // 3. Return the IPFS hashes
    
    return {
      imageHash: ipfsHash,
      metadataHash: `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    };
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

// Helper function to create NFT metadata
function createNFTMetadata(imageUrl, name, description, attributes = []) {
  return {
    name: name,
    symbol: "NFT",
    description: description,
    image: imageUrl,
    attributes: attributes,
    properties: {
      files: [
        {
          uri: imageUrl,
          type: "image/png"
        }
      ],
      category: "image"
    }
  };
}

// Helper function to process and optimize image
async function processImage(imagePath) {
  try {
    const outputPath = imagePath.replace(path.extname(imagePath), '_processed.png');
    
    await sharp(imagePath)
      .resize(512, 512, { 
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 90 })
      .toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'NFT Minting API is running!',
    version: '1.0.0',
    endpoints: {
      'POST /mint-nft': 'Mint a new NFT with image',
      'GET /nft/:mintAddress': 'Get NFT details',
      'GET /health': 'Health check'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    rpc: RPC_URL
  });
});

// Mint NFT endpoint
app.post('/mint-nft', upload.single('image'), async (req, res) => {
  try {
    const { name, description, attributes } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    
    console.log('Processing NFT mint request:', { name, description });
    
    // Check wallet balance and airdrop if needed
    const balance = await nftService.getWalletBalance();
    console.log('Wallet balance:', balance, 'SOL');
    
    if (balance < 0.1) {
      console.log('Low balance, requesting airdrop...');
      try {
        await nftService.requestAirdrop(2);
        console.log('Airdrop successful');
      } catch (airdropError) {
        console.error('Airdrop failed:', airdropError.message);
        
        // If airdrop fails due to rate limits, provide helpful error message
        if (airdropError.message.includes('429') || 
            airdropError.message.includes('rate limit') || 
            airdropError.message.includes('Too Many Requests')) {
          return res.status(429).json({
            success: false,
            error: 'Airdrop rate limit exceeded',
            details: airdropError.message,
            solutions: [
              'Wait 24 hours for rate limit to reset',
              'Use https://faucet.solana.com/ to manually get test SOL',
              'Try a different RPC provider (Helius, QuickNode)',
              'Use localnet for testing: solana-test-validator'
            ],
            walletAddress: nftService.wallet.publicKey.toString()
          });
        }
        
        // For other airdrop errors, throw them
        throw airdropError;
      }
    }
    
    // Process the uploaded image
    const processedImagePath = await processImage(req.file.path);
    console.log('Image processed:', processedImagePath);
    
    // Create metadata
    const metadata = createNFTMetadata(
      `${req.protocol}://${req.get('host')}/${path.basename(processedImagePath)}`,
      name,
      description,
      attributes ? JSON.parse(attributes) : []
    );
    
    console.log('Created metadata:', metadata);
    
    // Upload to IPFS (simulated)
    const imageBuffer = fs.readFileSync(processedImagePath);
    const ipfsData = await uploadToIPFS(imageBuffer, metadata);
    console.log('Uploaded to IPFS:', ipfsData);
    
    // Mint the NFT using the Anchor program
    console.log('Minting NFT on Solana...');
    const mintResult = await nftService.mintNFT(processedImagePath, metadata);
    console.log('NFT minted:', mintResult);
    
    // Clean up temporary files
    fs.unlinkSync(req.file.path);
    fs.unlinkSync(processedImagePath);
    
    res.json({
      success: true,
      message: 'NFT minted successfully!',
      data: {
        mintAddress: mintResult.mintAddress,
        signature: mintResult.signature,
        associatedTokenAccount: mintResult.associatedTokenAccount,
        metadata: metadata,
        imageUrl: `${req.protocol}://${req.get('host')}/${path.basename(processedImagePath)}`,
        ipfs: ipfsData,
        explorerUrl: `https://explorer.solana.com/tx/${mintResult.signature}?cluster=devnet`
      }
    });
    
  } catch (error) {
    console.error('Error minting NFT:', error);
    res.status(500).json({ 
      error: 'Failed to mint NFT',
      details: error.message 
    });
  }
});

// Get NFT details endpoint
app.get('/nft/:mintAddress', async (req, res) => {
  try {
    const { mintAddress } = req.params;
    
    console.log('Fetching NFT details for:', mintAddress);
    
    const nftDetails = await nftService.getNFTDetails(mintAddress);
    
    res.json({
      success: true,
      data: nftDetails
    });
    
  } catch (error) {
    console.error('Error fetching NFT:', error);
    res.status(500).json({ 
      error: 'Failed to fetch NFT details',
      details: error.message 
    });
  }
});

// Get wallet NFTs endpoint
app.get('/wallet/nfts', async (req, res) => {
  try {
    console.log('Fetching wallet NFTs...');
    
    const nfts = await nftService.getWalletNFTs();
    
    res.json({
      success: true,
      data: {
        nfts: nfts,
        count: nfts.length
      }
    });
    
  } catch (error) {
    console.error('Error fetching wallet NFTs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch wallet NFTs',
      details: error.message 
    });
  }
});

// Get wallet balance endpoint
app.get('/wallet/balance', async (req, res) => {
  try {
    const balance = await nftService.getWalletBalance();
    
    res.json({
      success: true,
      data: {
        balance: balance,
        address: nftService.wallet.publicKey.toString()
      }
    });
    
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    res.status(500).json({ 
      error: 'Failed to fetch wallet balance',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    details: error.message 
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 NFT Minting API listening on port ${port}`);
  console.log(`📡 RPC URL: ${RPC_URL}`);
  console.log(`🔗 Program ID: ${ANCHOR_PROGRAM_ID}`);
  console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads')}`);
});