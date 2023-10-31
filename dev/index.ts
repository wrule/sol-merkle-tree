import { ethers } from 'hardhat';
import { deployContract, init, meta } from './utils';
import { X } from '../typechain-types';
import { MerkleTree } from 'merkletreejs';
import { SHA3 } from 'crypto-js';

function hashPair(hash1: string, hash2: string) {
  const num1 = ethers.getBigInt(hash1);
  const num2 = ethers.getBigInt(hash2);
  let pair = `${hash1}${hash2.replace('0x', '')}`;
  if (num2 < num1) pair = `${hash2}${hash1.replace('0x', '')}`;
  return ethers.keccak256(pair);
}

function keccak256(message: string | CryptoJS.lib.WordArray) {
  return SHA3(message, { outputLength: 256 });
}

async function main() {
  await meta();

  const leaves = ['a', 'b', 'c'].map(x => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256);
  const root = tree.getRoot().toString('hex')
  const leaf = keccak256('a').toString();
  const proof = tree.getProof(leaf);
  console.log(tree.verify(proof, leaf, root));

  // console.log(keccak256('a').toString());
  // console.log(ethers.keccak256(ethers.toUtf8Bytes('a')));
}

async function dev() {
  await init();
  main();
}

dev();
