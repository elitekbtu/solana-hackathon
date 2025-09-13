FROM --platform=linux/amd64 ubuntu:24.04

ARG DEBIAN_FRONTEND=noninteractive

# Install base utilities
RUN apt-get update -qq && apt-get upgrade -qq && apt-get install -qq --no-install-recommends \
    build-essential git curl wget jq pkg-config python3-pip \
    libssl-dev libudev-dev zlib1g-dev llvm clang cmake make libprotobuf-dev protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl "https://sh.rustup.rs" -sfo rustup.sh && \
    sh rustup.sh -y && \
    . "$HOME/.cargo/env" && \
    rustup component add rustfmt clippy && \
    rm rustup.sh

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

# Install Solana CLI
RUN sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"

# Install Anchor using AVM (faster than cargo install)
RUN . "$HOME/.cargo/env" && \
    cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
RUN . "$HOME/.cargo/env" && \
    avm install latest && \
    avm use latest

# Set up environment variables
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"
ENV PATH="/root/.cargo/bin:${PATH}"

# Set working directory
WORKDIR /root

# Set up Solana config for devnet
RUN solana config set --url https://api.devnet.solana.com

# Generate keypair (for development only)
RUN solana-keygen new --no-passphrase -o ~/.config/solana/id.json

# Airdrop SOL for development (devnet only)
RUN solana airdrop 2 || true

# Set working directory for anchor projects
WORKDIR /anchor
VOLUME /anchor

# Default command
CMD ["bash"]
