var TIT_Vesting = artifacts.require("TIT_Vesting");
var TIT_Coin = artifacts.require("TIT_Coin");

module.exports = async function(deployer, network, accounts) {
    const vesting_Address = accounts[1];
    const timestamp_Start = Math.floor(Date.now() / 1000);
    const vesting_Duration_Months = 41; 
    const vesting_Duration_Seconds = vesting_Duration_Months * 31 * 24 * 60 * 60;
    await deployer.deploy(TIT_Vesting, vesting_Address, timestamp_Start, vesting_Duration_Seconds);
    const tit_Vesting = await TIT_Vesting.deployed();

    const TIT = await TIT_Coin.deployed();
    const totalSupplyDenomination = await TIT.cap();
    const decimals = 14;
    const vestingPercentage = 3;
    const vestingAmount = Math.round((totalSupplyDenomination)/10**decimals)*(vestingPercentage/100);    
    await TIT.mint(accounts[0], vestingAmount);
    await TIT.transfer(tit_Vesting.address, vestingAmount);

    const oneMonthLaterTimestamp = timestamp_Start + 30 * 24 * 60 * 60;
    const sixMonthsLaterTimestamp = timestamp_Start + 6 * 30 * 24 * 60 * 60;
    const endOfVestingTimestamp = timestamp_Start + vesting_Duration_Seconds;
    console.log("Vested amount after 1 month:", BigInt(await tit_Vesting.methods['vestedAmount(address,uint64)'](TIT.address, oneMonthLaterTimestamp)));
    console.log("Vested amount after 6 months:", BigInt(await tit_Vesting.methods['vestedAmount(address,uint64)'](TIT.address, sixMonthsLaterTimestamp)));
    console.log("Vested amount at end of vesting:", BigInt(await tit_Vesting.methods['vestedAmount(address,uint64)'](TIT.address, endOfVestingTimestamp)));
};
