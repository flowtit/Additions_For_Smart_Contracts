var BirthdayPayout = artifacts.require("BirthdayPayout");

const GAS = "3000000";
const DEPOSIT = web3.utils.toWei("1","ether");
const PRESENT = 100000000000000000;

let firstTeammateName = "Alex";
let firstTeammateAddress = "";
let firstTeammateBirthday = "1108415567"
let firstDate = {
    "day":14,
    "month":2,
    "year":2005
}

let secondTeammateName = "Maria";
let secondTeammateAddress = "";
let date = new Date();
date.setYear(date.getYear()-25);
let secondTeammateBirthday =  Math.round(date.getTime()/1000);
let birthdayPayout = null;

contract("BirthdayPayout", async(accounts)=>{
    firstTeammateAddress = accounts[1];
    secondTeammateAddress = accounts[2];

    it("getDate() returns correct date when given timestamp",async()=>{
    birthdayPayout = await BirthdayPayout.deployed();
    let date = await getDate(firstTeammateBirthday);
    assert.equal(date["day"],firstDate["day"],"days are not equal");
    assert.equal(date["month"],firstDate["month"],"months are not equal");
    assert.equal(date["year"],firstDate["year"],"years are not equal");
    });

    it("getTeammate() correctly returns Teammate by index",async()=>{
    let index = 0;
    await testGetTeammate(0,firstTeammateAddress,firstTeammateName,firstTeammateBirthday);

    let index2 = 1;
    let teammate2 = false;
    let message = "";
    try{
    teammate2 = await getTeammate(index2);
    }catch(e){
    message = e.message;
    }
    assert.isTrue(message.indexOf("revert")>=0,"Expected Error message differs from what is expected")
    assert.notEqual(typeof teammate2, "object","getTeammate() on wrong index has returned object");
    assert.equal(teammate2, false,"getTeammate() on wrong index is not null");
    });

    it("addTeammate() correctly adds Teammate to db",async()=>{
    let teammateNumberPre = await getTeammatesNumber();
    await addTeammate(secondTeammateAddress,secondTeammateName,secondTeammateBirthday);
    let teammate = false;
    await testGetTeammate(1,secondTeammateAddress,secondTeammateName,secondTeammateBirthday);
    let teammateNumberAfter = await getTeammatesNumber();
    let expectedTeammateNumber = parseInt(teammateNumberPre)+1;
    assert.equal(teammateNumberAfter,expectedTeammateNumber,"Teammates Number is not correctly incremented");
    });

    it("checkBirthday() works correctly",async()=>{
    let firstIsBirthday = await birthdayPayout.checkBirthday(0);
    let secondIsBirthday = await birthdayPayout.checkBirthday(1);
    assert.isFalse(firstIsBirthday, "First should not be birthday");
    assert.isTrue(secondIsBirthday, "Second should be birthday");
    });

    it("BBDay sends present",async()=>{
    let firstBalancePre = await getBalance(firstTeammateAddress);
    let secondBalancePre = await getBalance(secondTeammateAddress);
    await deposit(DEPOSIT);
    await BBDay();		
    let firstBalanceAfter = await getBalance(firstTeammateAddress);
    let secondBalanceAfter = await getBalance(secondTeammateAddress);
    let newBalance = parseInt(PRESENT)+parseInt(secondBalancePre);
    assert.equal(firstBalanceAfter,firstBalancePre,"First Balance is not the same after gift");
    assert.equal(secondBalanceAfter,newBalance,"Second Balance is the same after gift");
    });
});

    async function testGetTeammate(index,expectedAddress,expectedName,expectedBirthday){
    let teammate = false;
    try{
    teammate = await getTeammate(index);
    }catch(e){
    console.log(e.message);
    }
    assert.equal(typeof teammate, "object","getTeammate() has not returned object");
    assert.equal(teammate["account"], expectedAddress ,"Addresses are not equal");
    assert.equal(teammate["name"], expectedName ,"Names are not equal");
    assert.equal(teammate["birthday"],  expectedBirthday ,"Birthdays are not equal");	
    }

    async function getTeammate(index){
    return await birthdayPayout.getTeammate(index);
    }

    async function getTeammatesNumber(){
    let res = await birthdayPayout.getTeammatesNumber();
    res = res.toNumber();
    return res;
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

    async function getDate(timestamp){
    let date = await birthdayPayout.getDate(timestamp);
    date["day"]=date["day"].toNumber();
    date["month"]=date["month"].toNumber()
    date["year"]=date["year"].toNumber();
    return date;
    }
