Migration file that:

1. uploads Cow, Horse, Wolf, and Farmer smart contracts to the blockchain;

2. alternately executes 2 calls to the "Farmer.call(address)" method, 
  where address is first the address of the Cow contract, then Horse;

3. executes 2 calls to the "Farmer.feed(address,food)" method, where in both cases address is the address of the Wolf contract, and food is “plant” in the first case, and “meat” in the second.
