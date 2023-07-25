var Horse = artifacts.require("Horse");
var Dog = artifacts.require("Dog");
var Farmer = artifacts.require("Farmer");

const GAS = "3000000";
const DEPOSIT = web3.utils.toWei("1","ether");

contract ("Horse and Farmer", accounts =>{
  let horse;
  let farmer;

  before (async()=>{
  horse = await Horse.deployed();
  farmer = await Farmer.deployed();
  });
  
  it("Horse has the correct name", async()=>{
  let horseName = "Rhiann";
  assert.equal(horseName, "Rhiann", "Horse has incorrect name");
  });

  it("Horse can sleep", async()=>{
  let result = await horse.sleep();
  assert.equal(result, "Z-z-z-z", "Horse can't sleep");
  });

  it("Horse can eat “plant”", async()=>{
  let result = await farmer.feed(horse.address, "plant");
  assert.equal(result, "Nom-nom", "Horse cannot eat plant");
  });

  it("Horse cannot eat “meat”, “not-food”, “plastic”", async()=>{
  try{
  await farmer.feed(horse.address, "meat, non-food and plastic");
  }catch (error){
  assert.include(
  error.message, "It cannot eat this");}
  });

  it("Farmer can call Horse, Horse responds correctly", async()=>{
  let result = await farmer.call(horse.address);
  assert.equal(result, "Igo-go", "Horse doesnot responds correctly");
  });

  it("Farmer can feed Horse with plant", async()=>{
  let result = await farmer.feed(horse.address, "plant");
  assert.equal(result, "Nom-nom", "Farmer cannot feed Horse with plant");
  });
  
  it("Farmer cannot feed Horse with anything else”", async()=>{
  try{
  await farmer.feed(horse.address, "non-food");
  assert.fail();
  }catch (error){
  assert(error.message.includes("It cannot eat this"));
  }
  await farmer.feed(horse.address, "plant");
  });

});

contract ("Dog and Farmer", accounts =>{
  let dog;
  let farmer;

  before (async()=>{
  dog = await Dog.deployed(); 
  farmer = await Farmer.deployed();
  });
  
  it("Dog has the correct name", async()=>{
  let dogName = "Sharik";
  assert.equal(dogName, "Sharik", "Dog has incorrect name");
  });

  it("Dog can sleep", async()=>{
  let result = await dog.sleep();
  assert.equal(result, "Z-z-z-z", "Dog can't sleep");
  });

  it("Dog can eat “plant”", async()=>{
  let result = await farmer.feed(dog.address, "plant");
  assert.equal(result, "Nom-nom", "Dog cannot eat plant");
  });

  it("Dog can eat “meat”", async()=>{
  let result = await farmer.feed(dog.address, "meat");
  assert.equal(result, "Nom-nom", "Dog cannot eat meat");
  });

  it("Dog cannot eat “not-food”, “plastic”, “chocolate”", async()=>{
  try{
  await farmer.feed(dog.address, "not-food, plastic and chocolate");
  }catch (error){
  assert.include(
  error.message, "It cannot eat this", "It's not healthy for animals to eat a chocolate");}
  });

  it("Farmer can call Dog, Dog responds correctly", async()=>{
  let result = await farmer.call(dog.address);
  assert.equal(result, "Wooof", "Dog doesnot responds correctly");
  });

  it("Farmer can feed Dog with “meat”, “plant”", async()=>{
  let result = await farmer.feed(dog.address, "plant" || "meat");
  assert.equal(result, "Nom-nom", "Farmer cannot feed Dog with plant");
  });
  
  it("Farmer cannot feed Dog with anything else”", async()=>{
  try{
  await farmer.feed(dog.address, "non-food");
  assert.fail();
  }catch (error){
  assert(error.message.includes("It cannot eat this"));
  }
  await farmer.feed(dog.address, "plant");
  await farmer.feed(dog.address, "meat");
  });

});
