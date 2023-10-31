import { ethers } from 'hardhat';
import { init, meta } from './utils';

async function main() {
  await meta();
  const data = [
    '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
    '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
  ];
  // data.forEach((item) => {
  //   console.log(ethers.keccak256(item));
  // });
  console.log(ethers.keccak256(`${
    '0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65'
  }${
    '4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c'
  }`));
  console.log(ethers.keccak256('0xad244e5bd3fb328e827d41c235daf10d4022beee814f707874034bc00dd1c448'));
}

async function dev() {
  await init();
  main();
}

dev();
