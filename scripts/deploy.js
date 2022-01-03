
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  const GameItemsFactory = await ethers.getContractFactory(
    "GameItemFactory"
  );
  const gameItemsFactory = await GameItemsFactory.deploy();
  await gameItemsFactory.deployed();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("GameFactory deployed to:: ", gameItemsFactory.address);

  let config = `
  export const gameItemsFactoryAddress = "${gameItemsFactory.address}"
  `;

  let data = JSON.stringify(config);
  fs.writeFileSync("config.js", JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
