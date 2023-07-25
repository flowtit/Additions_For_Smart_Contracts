var ERC20 = artifacts.require("ERC20");
var IERC20 = artifacts.require("IERC20");
var IERC20Metadata = artifacts.require("IERC20Metadata");
var Context = artifacts.require("Context");

const GAS = "3000000";
const DEPOSIT = web3.utils.toWei("1","ether");

module.exports = async(deployer)=>{
    if(!(await ERC20.deployed())){
    await deployer.deploy(ERC20);
    }
    if(!(await IERC20.deployed())){
    await deployer.link(IERC20);
    }
    if(!(await IERC20Metadata.deployed())){
    await deployer.deploy(IERC20Metadata);
    }
    if(!(await Context.deployed())){
    await deployer.deploy(Context);
    }
}
