# Butaq NFT Studio 🎮⚡

> Transform your gaming achievements into valuable digital assets on the Solana blockchain

## 🚀 Live Demo

**Frontend deployed at:** [https://solana-hackathon-5nls.vercel.app/](https://solana-hackathon-5nls.vercel.app/)

## 🎯 Project Overview

**Butaq NFT Studio** is a revolutionary platform that bridges the gap between gaming and blockchain technology. We enable gamers to mint their gaming achievements, memorable moments, and digital assets as NFTs on the Solana blockchain, creating a new economy around gaming culture.

### 🌟 Why We Built This

- **Problem**: Gamers invest countless hours building achievements and memories, but these digital assets remain trapped within specific games and platforms
- **Solution**: Our platform allows gamers to immortalize their achievements on the blockchain, creating lasting value and ownership
- **Vision**: Build the future of gaming NFTs, one block at a time

## 🏗️ Architecture & Technology Stack

### Frontend (`/frontend`)
**Tech Stack:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components (shadcn/ui)
│   │   └── demos/        # Component demonstrations
│   ├── pages/
│   │   ├── Home.tsx      # Landing page
│   │   ├── Create.tsx    # NFT creation interface
│   │   ├── About.tsx     # Team information
│   │   └── Gallery.tsx   # NFT gallery
│   └── lib/              # Utilities and helpers
├── public/               # Static assets & team photos
└── Docker configuration
```

**Key Features:**
- 🎨 Modern Apple-inspired design system
- 🌈 Advanced animations with Framer Motion
- 📱 Fully responsive interface
- ⚡ Fast loading with Vite
- 🎯 Type-safe development with TypeScript

### Backend (`/backend`)
**Tech Stack:** Node.js + Express + Solana Web3.js

```
backend/
├── app.js              # Main Express server
├── nftService.js       # NFT minting logic
├── get-test-sol.js     # SOL token management
├── quick-sol.js        # Quick Solana operations
├── test-nft.js         # NFT testing utilities
└── wallet.json         # Solana wallet configuration
```

**API Endpoints:**
- `POST /api/mint-nft` - Mint new gaming NFT
- `GET /api/wallet/balance` - Check wallet balance
- `POST /api/upload` - Upload gaming assets

### Solana Integration (`/anchor` & `/solana`)

**Blockchain Infrastructure:**
```
anchor/                 # Anchor framework for Solana programs
├── programs/anchor/    # Smart contract code
│   └── src/lib.rs     # Main program logic
├── tests/             # Program tests
└── migrations/        # Deployment scripts

solana/
└── config/
    └── id.json        # Solana program ID
```

**Smart Contract Features:**
- 🎮 Gaming NFT metadata standards
- 🔒 Secure minting process
- 💰 Royalty management for creators
- 🏆 Achievement verification system

## 🐳 Docker Configuration

Fully containerized architecture with Docker Compose:

```yaml
services:
  frontend:     # React + Nginx production build
  backend:      # Node.js API server
  anchor:       # Solana development environment
```

**Deployment:**
```bash
# Build and run all services
docker-compose up --build

# Run specific service
docker-compose up frontend -d
```

## 👥 Team - Butaq Development Studio

| Role | Name | Expertise |
|------|------|-----------|
| 🎯 **Product Manager** | Alibek Anuarbek | Strategy & Vision |
| 💻 **Frontend Developer** | Ualikhanuly Beknur | React & UI/UX |
| ⚙️ **Backend Developer** | Yermakhan Sultan | Node.js & APIs |
| 🚀 **Full-Stack Developer** | Satbaldiyev Turarbek | End-to-end Development |

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Solana CLI
- Anchor Framework

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd solana-hackathon
```

2. **Frontend Development**
```bash
cd frontend
npm install
npm run dev
```

3. **Backend Development**
```bash
cd backend
npm install
node app.js
```

4. **Solana Program Development**
```bash
cd anchor
anchor build
anchor test
anchor deploy
```

5. **Docker Development**
```bash
# Run entire stack
docker-compose up --build

# Run specific services
docker-compose up frontend backend -d
```

## 🎮 Features

### For Gamers
- 🎯 **Easy NFT Creation**: Upload gaming screenshots and achievements
- 🏆 **Achievement Minting**: Convert gaming milestones into NFTs
- 🎨 **Custom Metadata**: Add descriptions and attributes to NFTs
- 🖼️ **Personal Gallery**: Showcase your gaming NFT collection

### For Developers
- 🔧 **Modern Tech Stack**: Built with latest technologies
- 📦 **Component Library**: Reusable UI components
- 🎨 **Design System**: Consistent styling with Tailwind CSS
- 🧪 **Testing Suite**: Comprehensive testing for smart contracts

### For Collectors
- 🌟 **Unique Gaming Assets**: Collect rare gaming moments
- 💎 **Verified Authenticity**: Blockchain-verified ownership
- 📈 **Value Appreciation**: Investment potential in gaming culture
- 🔄 **Easy Trading**: Simple marketplace integration

## 🚦 Project Status

- ✅ **Frontend**: Deployed and fully functional
- ✅ **Backend**: Core APIs implemented
- ✅ **Smart Contracts**: Basic NFT minting ready
- 🔄 **Advanced Features**: In development
- 📱 **Mobile App**: Planned for future releases

## 🎨 Design Philosophy

**Apple-Inspired Minimalism:**
- Clean, intuitive interfaces
- Smooth animations and transitions
- Focus on user experience
- Consistent design language
- Dark/light mode support

## 🔗 Links & Resources

- **Live Demo**: [https://solana-hackathon-5nls.vercel.app/](https://solana-hackathon-5nls.vercel.app/)
- **Solana Network**: Devnet/Mainnet compatibility
- **Documentation**: Component library and API docs
- **Team Photos**: Real team gallery in the app

## 🏆 Hackathon Goals

1. **Innovation**: Revolutionize gaming asset ownership
2. **Technology**: Showcase Solana's capabilities
3. **Community**: Build a platform for gamers
4. **Future**: Create sustainable gaming economy

## 📄 License

This project is built for the Solana Hackathon and represents the future of gaming NFTs.

---

**Built with ❤️ by Butaq Team** | **Powered by Solana ⚡**

*Building the future of gaming NFTs, one block at a time.*
