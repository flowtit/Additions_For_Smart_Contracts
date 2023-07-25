var BirthdayPayout = artifacts.require("BirthdayPayout");

const GAS = "3000000";
const DEPOSIT = web3.utils.toWei("1","ether");

let firstTeammateName = "Alex";
let firstTeammateAddress = "";
let firstTeammateBirthday = "1108415567";

let secondTeammateName = "Maria";
let secondTeammateAddress = "";

let date = new Date();
date.setYear(date.getYear()-25);
let secondTeammateBirthday = Math.round(
date.getTime()/1000);

let birthdayPayout = null;
    module.exports = async(deployer)=>{
    if(!(await BirthdayPayout.deployed())){
    await deployer.deploy(BirthdayPayout);
    }
      
birthdayPayout = await BirthdayPayout.deployed();
    
    firstTeammateAddress = (await web3.eth.getAccounts())[1];
    secondTeammateAddress = (await web3.eth.getAccounts())[2];
    
    let teammate_0 = null;
    let teammate_1 = null;
    
    try{
    teammate_0 = await getTeammate(0);
    console.log(teammate_0);
    }catch(e){
    if(e.message.indexOf("revert")>=0){
    console.log("No teammate found, adding one");
    await addTeammate(firstTeammateAddress,firstTeammateName,firstTeammateBirthday);
    console.log('Teammate added');
    teammate_0 = await getTeammate(0);
    }
}
      
    async function getTeammate(index){
    return await birthdayPayout.getTeammate(index);
    }

    async function addTeammate(address,name,birthday){
    let sender = (await web3.eth.getAccounts())[0];
    return await birthdayPayout.addTeammate(address,name,birthday);
    }
    
    async function BBDay(){
    return await birthdayPayout.BBDay();
    }

    async function deposit(amount){
    return await birthdayPayout.deposit({value:amount});
    }

    async function getBalance(address){
    return await web3.eth.getBalance(address);
    }
}
