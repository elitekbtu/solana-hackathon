import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Anchor } from "../target/types/anchor";
import { getAssociatedTokenAddress, getMint, getAccount } from "@solana/spl-token";

describe("anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.anchor as Program<Anchor>;
  const provider = anchor.getProvider();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Mints an NFT successfully", async () => {
    // Generate a new keypair for the mint
    const mint = anchor.web3.Keypair.generate();
    
    // Get the associated token account address
    const associatedTokenAccount = await getAssociatedTokenAddress(
      mint.publicKey,
      provider.wallet.publicKey
    );

    console.log("Mint address:", mint.publicKey.toBase58());
    console.log("Associated token account:", associatedTokenAccount.toBase58());

    // Call the mint_nft method
    const tx = await program.methods
      .mintNft()
      .accounts({
        payer: provider.wallet.publicKey,
        mint: mint.publicKey,
        associatedTokenAccount: associatedTokenAccount,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([mint])
      .rpc();

    console.log("Mint NFT transaction signature:", tx);

    // Verify the mint account was created
    const mintAccount = await getMint(provider.connection, mint.publicKey);
    console.log("Mint account details:", {
      address: mint.publicKey.toBase58(),
      supply: mintAccount.supply.toString(),
      decimals: mintAccount.decimals,
      mintAuthority: mintAccount.mintAuthority,
      freezeAuthority: mintAccount.freezeAuthority,
    });

    // Verify the token account was created and has 1 token
    const tokenAccount = await getAccount(provider.connection, associatedTokenAccount);
    console.log("Token account details:", {
      address: associatedTokenAccount.toBase58(),
      amount: tokenAccount.amount.toString(),
      mint: tokenAccount.mint.toBase58(),
      owner: tokenAccount.owner.toBase58(),
    });

    // Verify that exactly 1 token was minted
    expect(tokenAccount.amount.toString()).to.equal("1");
    
    // Verify that mint authority is now None (disabled)
    expect(mintAccount.mintAuthority).to.be.null;
  });
});
