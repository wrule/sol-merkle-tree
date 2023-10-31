import { ethers } from 'hardhat';
import { deployContract, init, meta } from './utils';
import { X } from '../typechain-types';

async function main() {
  await meta();
  const x = await deployContract<X>('X');
  const a = await x.verify([
    '0x999bf57501565dbd2fdcea36efa2b9aef8340a8901e3459f4a4c926275d36cdb',
    '0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c',
  ],
    '0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097',
    '0x5931b4ed56ace4c46b68524cb5bcbf4195f1bbaacbe5228fbd090546c88dd229',
  );
  console.log(a);
}

async function dev() {
  await init();
  main();
}

dev();
