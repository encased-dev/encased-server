import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jdenticon = require("jdenticon");
import dotenv from "dotenv";

dotenv.config();

export const createMetadata = (tokenId) => {
  console.log(`Token id ${tokenId}`);
  return {
    name: `EBX-${tokenId}`,
    description:
      "A tradable box (ERC-721), which holds ERC-20 tokens, that get credited to the owner upon 'unpacking' it. Box owner can mint Child Boxes and transfer portions of their ERC-20 tokens to them",
    image: `${process.env.DEV_URL}/images/${tokenId}`,
    tokens: [],
  };
};

export const createImage = (tokenId) => {
  return jdenticon.toPng(tokenId, 400);
  // let path = `./${tokenId}.png`;
  // fs.writeFileSync(path, data);
  // return pinFileToIPFS(path, tokenId);
};
