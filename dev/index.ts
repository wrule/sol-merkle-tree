import { ethers } from 'hardhat';
import { deployContract, init, meta } from './utils';
import { X } from '../typechain-types';

function hashPair(hash1: string, hash2: string) {
  const num1 = ethers.getBigInt(hash1);
  const num2 = ethers.getBigInt(hash2);
  let pair = `${hash1}${hash2.replace('0x', '')}`;
  if (num2 < num1) pair = `${hash2}${hash1.replace('0x', '')}`;
  return ethers.keccak256(pair);
}

async function main() {
  await meta();
  console.log(hashPair(
    '0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65',
    '0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c',
  ));

  // const x = await deployContract<X>('X');
  // const a = await x.verify([
  //   '0x999bf57501565dbd2fdcea36efa2b9aef8340a8901e3459f4a4c926275d36cdb',
  //   '0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c',
  // ],
  //   '0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097',
  //   '0x5931b4ed56ace4c46b68524cb5bcbf4195f1bbaacbe5228fbd090546c88dd229',
  // );
  // console.log(a);
  // console.log(ethers.keccak256(`${
  //   '0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c'
  // }${
  //   '9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65'
  // }`));
  // console.log(ethers.getBigInt('0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c'));
}

async function dev() {
  await init();
  main();
}

dev();
