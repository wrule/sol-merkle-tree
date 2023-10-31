import { init, meta } from './utils';

async function main() {
  await meta();
}

async function dev() {
  await init();
  main();
}

dev();
