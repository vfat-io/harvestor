import "@nomiclabs/hardhat-ethers";
import 'hardhat-typechain';
import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from 'dotenv';

dotenv.config();

const config : HardhatUserConfig = {
  solidity: {
    compilers : [ { 
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        } 
      },
    ]
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      forking: {
        url: process.env.RPC_URL!,
      },
      accounts: [{privateKey: process.env.HARVESTOR_PK!, balance: "10000000000000000000000000"}],
    },
    polygon : {
      url: process.env.RPC_URL!,
      accounts: [process.env.HARVESTOR_PK!]
    }
  },
};

export default config;