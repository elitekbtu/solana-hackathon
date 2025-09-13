#!/usr/bin/env node

const NFTService = require('./nftService');
const fs = require('fs');
const path = require('path');

async function testNFTSolution() {
  console.log('🧪 Testing NFT Minting Solution...\n');
  
  try {
    // Initialize NFT service
    const nftService = new NFTService();
    
    // Check wallet balance
    console.log('1. Checking wallet balance...');
    const balance = await nftService.getWalletBalance();
    console.log(`   Current balance: ${balance} SOL`);
    
    // Check if we have enough SOL
    if (balance < 0.1) {
      console.log('2. Low balance detected, attempting airdrop...');
      try {
        await nftService.requestAirdrop(2);
        console.log('   ✅ Airdrop successful');
        
        // Wait for balance to be available
        await nftService.waitForBalance(0.1);
        console.log('   ✅ Balance confirmed');
      } catch (airdropError) {
        console.log('   ❌ Airdrop failed:', airdropError.message);
        console.log('\n📋 Manual Solutions:');
        console.log('   1. Visit https://faucet.solana.com/');
        console.log('   2. Enter your wallet address:', nftService.wallet.publicKey.toString());
        console.log('   3. Request 2 SOL');
        console.log('   4. Wait for confirmation');
        console.log('\n🔗 Alternative Faucets:');
        console.log('   - https://solfaucet.com/');
        console.log('   - https://faucet.quicknode.com/solana/devnet');
        console.log('   - https://www.testnetfaucet.org/');
        return;
      }
    } else {
      console.log('   ✅ Sufficient balance for testing');
    }
    
    // Test NFT minting
    console.log('\n3. Testing NFT minting...');
    
    // Create test metadata
    const testMetadata = {
      name: 'Test NFT',
      description: 'A test NFT created with the fixed solution',
      image: 'https://via.placeholder.com/512x512.png',
      attributes: [
        { trait_type: 'Test', value: 'True' },
        { trait_type: 'Fixed', value: 'Yes' }
      ]
    };
    
    // Create a dummy image file for testing
    const testImagePath = path.join(__dirname, 'test-image.png');
    if (!fs.existsSync(testImagePath)) {
      // Create a simple test image (1x1 pixel PNG)
      const testImageBuffer = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
        0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x0F, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x00, 0x18, 0xDD, 0x8D, 0xB4, 0x00, 0x00, 0x00, 0x00,
        0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
      ]);
      fs.writeFileSync(testImagePath, testImageBuffer);
    }
    
    try {
      const mintResult = await nftService.mintNFT(testImagePath, testMetadata);
      
      console.log('   ✅ NFT minted successfully!');
      console.log('   📋 Mint Details:');
      console.log(`      Mint Address: ${mintResult.mintAddress}`);
      console.log(`      Signature: ${mintResult.signature}`);
      console.log(`      Token Account: ${mintResult.associatedTokenAccount}`);
      console.log(`      Explorer: https://explorer.solana.com/tx/${mintResult.signature}?cluster=devnet`);
      
      // Test getting NFT details
      console.log('\n4. Testing NFT details retrieval...');
      const nftDetails = await nftService.getNFTDetails(mintResult.mintAddress);
      console.log('   ✅ NFT details retrieved:');
      console.log(`      Supply: ${nftDetails.supply}`);
      console.log(`      Decimals: ${nftDetails.decimals}`);
      console.log(`      Amount: ${nftDetails.amount}`);
      
      // Test getting wallet NFTs
      console.log('\n5. Testing wallet NFTs retrieval...');
      const walletNFTs = await nftService.getWalletNFTs();
      console.log(`   ✅ Found ${walletNFTs.length} NFTs in wallet`);
      
      console.log('\n🎉 All tests passed! The NFT minting solution is working correctly.');
      
    } catch (mintError) {
      console.log('   ❌ NFT minting failed:', mintError.message);
      console.log('\n🔍 Debugging information:');
      console.log('   - Check if the Anchor program is deployed');
      console.log('   - Verify the program ID is correct');
      console.log('   - Ensure sufficient SOL for transaction fees');
      console.log('   - Check RPC connection');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testNFTSolution().catch(console.error);
