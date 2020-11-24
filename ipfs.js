import dotenv from "dotenv";
dotenv.config();
import IpfsHttpClient from "ipfs-http-client";
const { urlSource } = IpfsHttpClient;
const ipfs = IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const getFile = async (hash) => {
  try {
    for await (const file of ipfs.get(hash)) {
      if (!file.content) continue;

      const content = [];
      for await (const chunk of file.content) {
        content.push(chunk);
      }
      return content;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
