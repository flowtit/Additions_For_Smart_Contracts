pragma solidity ^0.8.17;

contract HasName{
    
  string _name;
  
  constructor(string memory name){
  _name = name;
  }
  
  function getName()view public returns(string memory){
  return _name;
  }
}

contract Animal{

  function eat(string memory food) view virtual public returns(string memory){
  return "Nom-nom";
  }
  
  function speak() view  virtual public returns(string memory){
  return"...";
  }
  
  function sleep() view public returns(string memory){
  return "Z-z-z-z";
  }
}

library StringCompare{
        
  function compare(string memory str1, string memory str2) public pure returns (bool) {
  return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
  }
}

abstract contract Herbivore is Animal, HasName{

  string constant PLANT="plant";
  
  function eat(string memory food) view override onlyPlant(food) public returns(string memory){
  return super.eat(food);
  }
  
  modifier onlyPlant(string memory food){
  require(StringCompare.compare(food, PLANT), "It cannot eat this");
  _;
  }
}

abstract contract Carnivore is Animal, HasName{

  string constant MEAT="meat";
  
  function eat(string memory food) view override onlyMeat(food) public returns(string memory){
  return super.eat(food);
  }
  
  modifier onlyMeat(string memory food){
  require(StringCompare.compare(food, MEAT), "It cannot eat this");
  _;
  }
}

abstract contract Omnivore is Animal, HasName{

  string constant MEAT="meat";
  string constant PLANT="plant";
  string constant CHOCOLATE="chocolate";
  
  function eat(string memory food) view override omnivores(food) public returns(string memory){
  return super.eat(food);
  }

  modifier omnivores(string memory food){
  require(!StringCompare.compare(food, CHOCOLATE), "It's not healthy for animals to eat a chocolate");
  require(StringCompare.compare(food, MEAT) || StringCompare.compare(food, PLANT), "It cannot eat this");
  _;
  }
}

contract Cow is Herbivore{

  constructor(string memory name) HasName(name){
  }

  function speak() view override public returns(string memory){
  return "Mooo";
  }
}

contract Horse is Herbivore{

  constructor(string memory name) HasName(name){
  }

  function speak() view override public returns(string memory){
  return "Igo-go";
  }
}

contract Wolf is Carnivore{

  constructor(string memory name) HasName(name){
  }

  function speak() view override public returns(string memory){
  return "Awooo";
  }
}

contract Dog is Omnivore {

  constructor(string memory name) HasName(name){
  }

  function speak() view override public returns(string memory){
  return "Wooof";
  }
}

contract Farmer{

  function feed(address animal, string memory food) view public returns(string memory){
  return Animal(animal).eat(food);
  }
  
  function call(address animal) view public returns(string memory){
  return Animal(animal).speak();
  }
}
