// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract TIT_Coin is ERC20Capped, ERC20Burnable, Ownable {

    constructor () ERC20 ("TIT Coin", "TIT") ERC20Capped(3900000 * (10**decimals())) Ownable(){
    }
    
    function decimals() public pure override returns (uint8) {
    return 14;
    }

    function mint(address account, uint256 amount) public onlyOwner virtual {
    _mint(account, amount);
    }   

    function _mint(address account, uint256 amount) internal virtual override (ERC20, ERC20Capped) {
    require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
    super._mint(account, amount);
    }
}
