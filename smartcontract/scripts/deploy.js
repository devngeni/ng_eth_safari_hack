const { ethers } = require("hardhat");
const hre = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const Crypto = await hre.ethers.getContractFactory("sendCrypto");
  const crypto = await Crypto.deploy();
  await crypto.deployed();
  console.log("your sendCrypto contract is:", crypto)


  
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });