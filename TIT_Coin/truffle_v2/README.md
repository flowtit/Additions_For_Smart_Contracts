1. This version of the smart contract implements token vesting logic.

2. In the migration file, the Vesting Wallet smart contract is loaded into Ganache. When the contract is deployed, the constructor parameters are recorded:
- parameter 1 - the address of the recipient of the vesting;
- parameter 2 - vesting start moment;
- parameter 3 - duration of vesting.

3. The amount of tokens for vesting is sent in the migration file to the balance of this VestingWallet. The amount of tokens for vesting is the percentage of Total Supply that is transferred for vesting to the recipient of the vesting.

4. It shows how tokens are vests after 1 month, after 6 months and at the end of vesting (after the last day of vesting). The method was called 3 times and the result was output to the migration console.
