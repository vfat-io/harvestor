import { VaultIronLP } from "../typechain";
import { abi } from "../artifacts/contracts/VaultIronLP.sol/VaultIronLP.json"
import hre from "hardhat";
const { ethers }  = hre;

const VAULT_ADDRESS = process.env.VAULT_ADDRESS!;

describe("Vault", function () {
    it("Can compound", async () => {
        const [harvestor]  = await ethers.getSigners();
        const VAULT = <VaultIronLP>new ethers.Contract(VAULT_ADDRESS, abi, harvestor);
        await VAULT.compound();
    })
})