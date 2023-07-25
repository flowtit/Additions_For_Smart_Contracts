const TIT_Coin = artifacts.require("TIT_Coin");

contract("TIT_Coin", (accounts)=>{
    let token;
    const name = "TIT Coin";
    const totalSupply = '0';
    const owner = accounts[0];
    const sender = accounts[1];
    const recipient = accounts[2];

    before (async () => {
    token = await TIT_Coin.new();
    });

    it("Total supply is equal to 0", async()=>{
    const result = await token.totalSupply();
    assert.equal(result, totalSupply, "Total supply greater than 0");
    });
    
    it("When performing transfer(), the sender's balance correctly decreases and the recipient's - increases", async () => {
    await token.mint(sender, 100, { from: owner });
    const senderBalanceBefore = await token.balanceOf(sender);
    const recipientBalanceBefore = await token.balanceOf(recipient);
    await token.transfer(recipient, 50, { from: sender });
    const senderBalanceAfter = await token.balanceOf(sender);
    const recipientBalanceAfter = await token.balanceOf(recipient);
    assert.equal(senderBalanceBefore - senderBalanceAfter, 50, "Sender's balance should decrease by 50");
    assert.equal(recipientBalanceAfter - recipientBalanceBefore, 50, "Recipient's balance should increase by 50");
    });

    it("When approving() is executed, the recipient's allowance() changes correctly", async () => {
    await token.mint(sender, 100, { from: owner });
    const recipientAllowanceBefore = await token.allowance(sender, recipient);
    await token.approve(recipient, 50, { from: sender });
    const recipientAllowanceAfter = await token.allowance(sender, recipient);
    assert.equal(recipientAllowanceAfter - recipientAllowanceBefore, 50, "Recipient's allowance should increase by 50");
    });

    it("When transferFrom() is executed by a user who was previously allowed to use tokens of another user, the sender's balance correctly decreases and the receiver's balance increases", async () => {
    await token.mint(sender, 100, { from: owner });
    await token.approve(recipient, 50, { from: sender });
    const senderBalanceBefore = await token.balanceOf(sender);
    const recipientBalanceBefore = await token.balanceOf(recipient);
    await token.transferFrom(sender, recipient, 50, { from: recipient });
    const senderBalanceAfter = await token.balanceOf(sender);
    const recipientBalanceAfter = await token.balanceOf(recipient);
    assert.equal(senderBalanceBefore - senderBalanceAfter, 50, "Sender's balance should decrease by 50");
    assert.equal(recipientBalanceAfter - recipientBalanceBefore, 50, "Recipient's balance should increase by 50");
    });

    it("A user without sufficient allowance cannot perform transferFrom with another user's tokens", async () => {
    await token.mint(sender, 100, { from: owner });
    const recipientAllowanceBefore = await token.allowance(sender, recipient);
    await token.approve(recipient, 50, { from: sender });
    const recipientAllowanceAfter = await token.allowance(sender, recipient);
    await token.transferFrom(sender, recipient, 50, { from: recipient });
    assert.equal(recipientAllowanceBefore + recipientAllowanceAfter, 50, "Recipient's allowance should be 50 to works correctly");
    });

    it("When performing burn(), the user's balance is correctly reduced", async () => {
    await token.mint(sender, 100, { from: owner });
    const balanceBefore = await token.balanceOf(sender);
    await token.burn(50, { from: sender });
    const balanceAfter = await token.balanceOf(sender);
    assert.equal(balanceBefore - balanceAfter, 50, "Sender's balance should decrease by 50");
    });
    
    it("_owner of the smart contract matches the user who downloaded the contract", async () => {
    const contractOwner = await token.owner();
    assert.equal(contractOwner, owner, "_owner should match the user who downloaded the contract");
    });
        
    it("Only owner can mint new tokens", async () => {
    try{
    await token.mint(sender, 100, { from: sender });
    assert.fail();
    } catch (error) {
    assert(error.message.includes("Ownable: caller is not the owner"));
    }
    });

    it("Other users can't mint new tokens", async () => {
    try {
    await token.mint(owner, 100, { from: sender });
    await token.mint(owner, 100, { from: recipient });
    assert.fail();
    } catch (error) {
    assert(error.message.includes("Ownable: caller is not the owner"));
    }
    });

    it("There is no way to increase _totalSupply beyond the value of _cap", async () => {
    const cap = await token.cap();
    try {
    await token.mint(owner, cap + 1, { from: owner });
    assert.fail();
    } catch (error) {
    assert(error.message.includes("ERC20Capped: cap exceeded"));
    }
    });
});
