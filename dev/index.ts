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

class OpenZeppelinMerleTree {
  public constructor(data: string[]) {
    this.tree = new MerkleTree(data, ethers.keccak256, {
      sortPairs: true,
      hashLeaves: true,
    });
    this._root = this.bufferString(this.tree.getRoot());
  }

  private tree!: MerkleTree;
  private _root = '';

  private bufferString(buffer: Buffer) {
    return '0x' + buffer.toString('hex');
  }

  public get Root() { return this._root; }

  public getProof(item: string) {
    return this.tree.getProof(ethers.keccak256(item)).map((route) => this.bufferString(route.data));
  }

  public verify(item: string, proof: string[]) {
    return this.tree.verify(proof, ethers.keccak256(item), this.Root);
  }
}

async function main() {
  await meta();
  const data = [
    '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
    '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
  ];
  const tree = new OpenZeppelinMerleTree(data);
  console.log(tree.Root);
  const proof = tree.getProof('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');
  console.log(tree.verify('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', proof));
}

async function dev() {
  await init();
  main();
}

dev();
