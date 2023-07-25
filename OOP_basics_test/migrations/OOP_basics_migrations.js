var Farmer = artifacts.require("Farmer");
var Cow = artifacts.require("Cow");
var Horse = artifacts.require("Horse");
var Wolf = artifacts.require("Wolf");
var Dog = artifacts.require("Dog");

const StringCompare = artifacts.require("StringCompare");
const GAS = "3000000";
const DEPOSIT = web3.utils.toWei("1","ether");

module.exports = async(deployer)=>{
  try {
  const StringCompare = await StringCompare.deployed();
  if (!StringCompare.address) throw "Not Deployed";
  } catch (error) {
  await deployer.deploy(StringCompare);
  await deployer.link(StringCompare, [Cow, Horse, Wolf, Dog]);
	await deployer.deploy(Cow, "Romana");
  await deployer.deploy(Horse, "Rhiann");
  await deployer.deploy(Wolf, "Ivory");
  await deployer.deploy(Dog, "Sharik");
  await deployer.deploy(Farmer, "Mr_Blue");

	const farmer = await Farmer.deployed();
	const cow = await Cow.deployed();
	const horse = await Horse.deployed();
	const wolf = await Wolf.deployed();
  const dog = await Dog.deployed();
  
  console.log(await farmer.call(cow.address));
  console.log(await farmer.call(horse.address));
  console.log(await farmer.call(dog.address));
  
  try {
    await farmer.feed(wolf.address, "plant");
    } catch(e) {
    if (e.message.includes("It cannot eat this")) {
    console.log("The wolf cannot eat this.");
    } 
  }
  
  try {
    await farmer.feed(wolf.address, "meat");
    console.log("The wolf ate the meat with pleasure");
    } catch(e) {
    if (e.message.includes("It cannot eat this")) {
    console.log("The wolf cannot eat this.");
    }
    }
  }
}
