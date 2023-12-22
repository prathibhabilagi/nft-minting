import {
  useSDK,
} from '@metamask/sdk-react-ui';
import Wallet from "./Wallet";
import NftContract from '../artifacts/nft.json';
import web3 from 'web3';

function Main() {
  const { provider, ready, account, balance } = useSDK();
  const Web3 = new web3(provider);

  if (!ready) {
    return <div>Loading...</div>;
  }

  var contract = new Web3.eth.Contract(
    NftContract,
    "0x13676E2bb756eDD147E41ae301B27F9EdcB98DC5"
  );

  const mintNFT = async () => {
    const tokenURI = "https://indigo-informal-deer-266.mypinata.cloud/ipfs/QmceH15G9exZuSp16vMdsE2MJN2mtxpj9TNqvymXCgMgkk?_gl=1*45ka9d*_ga*MjEzNjExMzYyNi4xNzAzMjY4OTM1*_ga_5RMPXG14TE*MTcwMzI2ODkzNC4xLjEuMTcwMzI2OTQwMS42MC4wLjA.";
    const to = account;
    try {
      await contract.methods
      .makeAnEpicNFT(tokenURI, to)
      .send({
        from: account,
      })
      .then(function (receipt) {
        console.log(receipt);
      });
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: ",
      };
    }
  };


  return (
    <div>
      <div>
        <Wallet/>
      </div>
        <p className='header'>
          NFT Minting platform
        </p>
        <button onClick={mintNFT}>Mint Nft</button>
    </div>
  );
}

export default Main;
