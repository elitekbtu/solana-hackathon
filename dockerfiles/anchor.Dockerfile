FROM node:18-bullseye

# Устанавливаем зависимости
RUN apt-get update && apt-get install -y \
    curl git build-essential pkg-config libssl-dev libudev-dev ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Solana CLI
RUN sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

# Anchor CLI
RUN cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked --force

WORKDIR /anchor
