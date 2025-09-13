const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Test the NFT minting API
async function testNFTMinting() {
  try {
    console.log('🧪 Testing NFT Minting API...\n');
    
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:3000/health');
    console.log('✅ Health check passed:', healthResponse.data);
    console.log('');
    
    // Test 2: Get wallet balance
    console.log('2. Testing wallet balance...');
    const balanceResponse = await axios.get('http://localhost:3000/wallet/balance');
    console.log('✅ Wallet balance:', balanceResponse.data);
    console.log('');
    
    // Test 3: Create a test image
    console.log('3. Creating test image...');
    const testImagePath = path.join(__dirname, 'test-image.png');
    
    // Create a simple test image using a data URL (1x1 pixel PNG)
    const testImageData = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      'base64'
    );
    
    fs.writeFileSync(testImagePath, testImageData);
    console.log('✅ Test image created:', testImagePath);
    console.log('');
    
    // Test 4: Mint NFT
    console.log('4. Testing NFT minting...');
    const formData = new FormData();
    formData.append('image', fs.createReadStream(testImagePath));
    formData.append('name', 'Test NFT #1');
    formData.append('description', 'A test NFT created by the API');
    formData.append('attributes', JSON.stringify([
      { trait_type: 'Color', value: 'Blue' },
      { trait_type: 'Rarity', value: 'Common' }
    ]));
    
    try {
      const mintResponse = await axios.post('http://localhost:3000/mint-nft', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      
      console.log('✅ NFT minted successfully!');
      console.log('📋 Response:', JSON.stringify(mintResponse.data, null, 2));
      console.log('');
      
      // Test 5: Get NFT details
      if (mintResponse.data.success && mintResponse.data.data.mintAddress) {
        console.log('5. Testing NFT details retrieval...');
        const nftDetailsResponse = await axios.get(
          `http://localhost:3000/nft/${mintResponse.data.data.mintAddress}`
        );
        console.log('✅ NFT details retrieved:', nftDetailsResponse.data);
        console.log('');
      }
    } catch (mintError) {
      if (mintError.response?.data?.error?.includes('airdrop') || 
          mintError.response?.data?.error?.includes('429') ||
          mintError.response?.data?.error?.includes('rate limit')) {
        console.log('⚠️  NFT minting failed due to airdrop rate limit.');
        console.log('💡 Solutions:');
        console.log('   1. Wait 24 hours for rate limit to reset');
        console.log('   2. Use https://faucet.solana.com/ to manually get test SOL');
        console.log('   3. Try a different RPC provider (Helius, QuickNode)');
        console.log('   4. Use localnet for testing: solana-test-validator');
        console.log('');
        console.log('🔄 Skipping NFT minting test due to airdrop limitations...');
      } else {
        throw mintError;
      }
    }
    
    // Test 6: Get wallet NFTs
    console.log('6. Testing wallet NFTs...');
    const walletNFTsResponse = await axios.get('http://localhost:3000/wallet/nfts');
    console.log('✅ Wallet NFTs:', walletNFTsResponse.data);
    console.log('');
    
    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
      console.log('🧹 Cleaned up test image');
    }
    
    console.log('🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run the test
testNFTMinting();
