var Web3 = require('web3'); 
var Abi = require('./compiled/contractAbi');
var web3 = new Web3("http://127.0.0.1:8545");

let contractAddress = "write_your_address_contract";
let contract = new web3.eth.Contract(Abi, contractAddress);

async function getContact(index){
  return await contract.methods.getContact(index).call();
  }

async function addContact(name){
  return await contract.methods.addContact(name).send({from:"write_your_address_contract", gas:"3000000"});
  }

let NewTeammateName = "SetName";

async function callContact(index){
  return await contract.methods.callContact(index).call();
  }

async function main(){
  let FirstTeammate = await getContact(0); 
  console.log(FirstTeammate);
  console.log("---------------");
  let result = await addContact(NewTeammateName);
  console.log(result);
  console.log("---------------");
  let SecondTeammate = await callContact(1);
  console.log(SecondTeammate);
  console.log("---------------");
}

main();
