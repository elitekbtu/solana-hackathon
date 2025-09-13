# NFT Minting Backend API

A Node.js backend API for minting NFTs on Solana using the Anchor framework with image support.

## Features

- 🖼️ Image upload and processing
- 🎨 NFT metadata generation
- ⛓️ Solana blockchain integration
- 🔗 Anchor program integration
- 📱 RESTful API endpoints
- 🔍 NFT querying and wallet management

## API Endpoints

### Core Endpoints

- `POST /mint-nft` - Mint a new NFT with image
- `GET /nft/:mintAddress` - Get NFT details
- `GET /wallet/nfts` - Get all NFTs in wallet
- `GET /wallet/balance` - Get wallet balance
- `GET /health` - Health check

### Mint NFT Request

```bash
curl -X POST http://localhost:3000/mint-nft \
  -F "image=@/path/to/image.png" \
  -F "name=My Awesome NFT" \
  -F "description=A unique digital artwork" \
  -F "attributes=[{\"trait_type\":\"Color\",\"value\":\"Blue\"}]"
```

### Response

```json
{
  "success": true,
  "message": "NFT minted successfully!",
  "data": {
    "mintAddress": "ABC123...",
    "signature": "DEF456...",
    "associatedTokenAccount": "GHI789...",
    "metadata": { ... },
    "imageUrl": "http://localhost:3000/processed-image.png",
    "ipfs": { ... },
    "explorerUrl": "https://explorer.solana.com/tx/..."
  }
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```bash
export RPC_URL=https://api.devnet.solana.com
export ANCHOR_PROGRAM_ID=DDnZChV4nH945pGZtCtojVq8jztZxFN6VYMeoBKmxE4t
export PORT=3000
```

3. Start the server:
```bash
npm start
```

## Dependencies

- **express** - Web framework
- **multer** - File upload handling
- **sharp** - Image processing
- **@coral-xyz/anchor** - Solana Anchor framework
- **@solana/web3.js** - Solana JavaScript SDK
- **@solana/spl-token** - SPL Token program

## Architecture

The backend consists of two main components:

1. **app.js** - Main Express server with API endpoints
2. **nftService.js** - Solana blockchain integration service

### NFT Service

The `NFTService` class handles:
- Wallet management
- Anchor program integration
- NFT minting transactions
- Blockchain queries

### Image Processing

Images are automatically:
- Resized to 512x512 pixels
- Converted to PNG format
- Optimized for web display

## Development

The backend integrates with the deployed Anchor program and automatically:
- Checks wallet balance
- Requests airdrop if needed
- Mints NFTs on Solana devnet
- Returns transaction details

## Production Considerations

- Use a secure wallet management system
- Implement proper IPFS integration
- Add authentication and authorization
- Set up proper error monitoring
- Use environment-specific configurations
