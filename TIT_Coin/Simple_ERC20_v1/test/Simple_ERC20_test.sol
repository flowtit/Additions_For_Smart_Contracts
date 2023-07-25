const ERC20 = artifacts.require("ERC20");

contract("ERC20", (accounts)=>{
    let token;
    const name = "TIT Coin";
    const symbol = "TIT";
    const decimals = 14;
    const totalSupply = BigInt(390000000000000000000);
    const creatorBalance = totalSupply;
    const supply = 3900000;
    const creator = accounts[0];

    before (async () => {
    token = await ERC20.new(name, symbol, supply, { from: creator });
    });

    it("Coin has the correct name", async()=>{
    const result = await token.name();
    assert.equal(result, name, "Coin has incorrect name");
    });
    
    it("Coin has the correct symbol", async () => {
    const result = await token.symbol();
    assert.equal(result, symbol, "The symbol is incorrect");
    });
    
    it("Coin has the correct number of decimals", async () => {
    const result = await token.decimals();
    assert.equal(result, decimals, "The number of decimals is incorrect");
    });

    it("Coin has the correct total supply", async () => {
    const result = await token.totalSupply();
    assert.equal(result, totalSupply, "The total supply is incorrect");
    });
    
    it("Coin has the correct balance for creator", async () => {
    const result = await token.balanceOf(creator);
    assert.equal(result, creatorBalance, "The balance of the creator is incorrect");
    });
});
