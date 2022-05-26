require('dotenv/config');
require('@nomiclabs/hardhat-ethers');
require("./tasks/mint");

const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";

const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "0000000000000000000000000000000000000000000000000000000000000000";

const BLOCK_NUMBER = process.env.BLOCK_NUMBER || 14848810;

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
        blockNumber: +BLOCK_NUMBER,
      },
      saveDeployments: false,
      gas: 9e6,
      initialBaseFeePerGas: 0,
    },
    mainnet: {
      chainId: 1,
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
      saveDeployments: true,
    },
  },
  solidity: "0.7.3",
};
