import dotenv from "dotenv";
import moment from "moment";
import abi from "./abi.json";
import axios from "axios";
import Web3 from "web3";
import { createImage, createMetadata } from "./metadata.js";
import HDWalletProvider from "truffle-hdwallet-provider-privkey";
dotenv.config();
const key = Buffer.from(process.env.KOVAN_PRIVATE_KEY, "hex");
const provider = new HDWalletProvider([key], process.env.RPC_URL_KOVAN);
export const web3 = new Web3(provider);

export const token = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

export const getTokenBalance = async (tokenId) => {
  let data = await token.methods.getAllBalancesPerBoxToken(tokenId).call();
  //TODO
  console.log(data);
};

export const checkExists = async (tokenId) => {
  let data;
  try {
    data = await token.methods.ownerOf(tokenId).call();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTokenData = async (address) => {
  let ethplorerURL = `https://kovan-api.ethplorer.io/getTokenInfo/${address}?apiKey=${process.env.ETHPLORER_API_KEY}`;
  let token = await axios.get(ethplorerURL);
  if (token.data) {
    return token.data.symbol;
  }
  return false;
};
