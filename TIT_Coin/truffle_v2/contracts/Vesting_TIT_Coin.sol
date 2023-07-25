// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/VestingWallet.sol";

contract TIT_Vesting is VestingWallet{

    uint64 DAY = 86400;

    uint64 DURATION = DAY * 1246;

    constructor(address _beneficiary, uint64 _start, uint64 _duration) VestingWallet(_beneficiary, _start, DURATION){
    }
}
