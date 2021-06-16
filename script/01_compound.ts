import { VaultIronLP } from "../typechain";
import { abi } from "../artifacts/contracts/VaultIronLP.sol/VaultIronLP.json"
import hre from "hardhat";
const { ethers }  = hre;

const VAULT_ADDRESS = process.env.VAULT_ADDRESS!;

const timer = (ms : number) => new Promise(res => setTimeout(res, ms))

const compound = async () => {
    const [harvestor]  = await ethers.getSigners();
    const VAULT = <VaultIronLP>new ethers.Contract(VAULT_ADDRESS, abi, harvestor);
    while (true) {
        const startTime = Date.now();
        console.log(`Starting compound at ${startTime}`)
        const gas = await ethers.provider.getGasPrice();
        const gasLimit = await VAULT.estimateGas.compound();
        const gasLimitExtra = gasLimit.add(gasLimit);
        const gasPriceExtra = gas.add(gas.div(5));
        const tx = await VAULT.compound({gasPrice: gasPriceExtra, gasLimit: gasLimitExtra});
        console.log(`Submitted tx ${tx.hash}`);
        try {
            await tx.wait();
            const endTime = Date.now()
            const diff = (endTime - startTime ) / 1000;
            console.log(`Compounded at ${endTime}. Tx time: ${diff} sec.`);
            console.log(`Gas Price: ${ethers.utils.formatUnits(gasPriceExtra, "gwei")}`);
            console.log(`Gas Limit: ${gasLimitExtra}`);
        }
        catch (ex) {
            console.log(`Tx error`)
        }
        await timer(5 * 60 * 1000);
    }    
}

compound();