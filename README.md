# Harvestor

Compound script for iron self-vaults

Instructions:
1) Git clone
2) `cp .env.sample .env`
3) Populate the 3 variables in .env
4) npm i
5) `npx hardhat run script/01_compound.ts` (against forked mainnet to test if it works)
6) `npx hardhat run script/01_compound.ts --network polygon` (against mainnet)

Script currently compounds every 5 minutes, this can be adjusted in script/01_compound.ts
