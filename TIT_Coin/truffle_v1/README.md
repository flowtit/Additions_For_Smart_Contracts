The token has been enhanced with the functionality of the following extensions:

1. All owners can burn their ERC20Burnable tokens (link)

2. The smart contract must have an owner (imitate the smart contract from Ownable, you can take the one we wrote in previous lessons);

3. The token is created from _totalSupply with a value of 0 (tokens are not waiting for deployment, that is, you can remove the call to the _mint() method from the constructor);

4. New tokens can be mined after starting the smart contract (the smart contract must have a mint() method that calls the internal method _mint();

5. Only the owner of the smart contract can mint new tokens (that is, only the owner can call the mint() method, this rule should be added as a modifier);

6. A limit is set on the emission of tokens (that is, there is a _cap variable in the smart contract that sets the maximum limit that _totalSupply (the number of tokens in circulation) can reach). _totalSupply cannot under any circumstances exceed _cap, that is, if when issuing new tokens via _mint() of tokens in circulation _totalSupply will exceed _cap - the transaction is canceled and new tokens are not expected. _cap is set 1 time directly in the code or as a parameter in the constructor.)

Added tests to the contract and test the hypotheses that:

1. "totalSupply() of tokens when loading the contract is equal to 0" (this test should be replaced with the test from the previous DZ ("That the totalSupply() of tokens is the same as in the table");

2. "When performing transfer(), the sender's balance correctly decreases and the recipient's - increases"

3. "When approving() is executed, the recipient's allowance() changes correctly"

4. "When transferFrom() is executed by a user (receiver) who was previously allowed to use tokens of another user (sender), the sender's balance correctly decreases and the receiver's balance increases"

5. "A user without sufficient allowance cannot perform transferFrom with another user's tokens"

6. "When performing burn(), the user's balance is correctly reduced"

7. "_owner of the smart contract matches the user who downloaded the contract"

8. “Only _owner can wait for new tokens”

9. "Other users cannot wait for new tokens"

10. "There is no way to increase _totalSupply beyond the value of _cap".
