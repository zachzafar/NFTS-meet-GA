import React, {useState,useEffect} from 'react'
import NFTcard from './NFTcard';
import {useConnection} from '@solana/wallet-adapter-react';
import {Metaplex} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js';
import {NFT} from './types/types';
import { Card, CardMedia, Typography } from '@mui/material';


const Main:React.FC = () => {
    const [NFTS, setNFTS] = useState<NFT[]>([]);
    const { connection } = useConnection();
    let key= 0;

    useEffect( () => {
      const candyMachine = new PublicKey(`${process.env.REACT_APP_CANDY_MACHINE_ID}`);
      const metaplex = new Metaplex(connection);
      const loadCandyMachineMints =  async () => {
      let nft:NFT;
      let nftList:NFT[] = [];
      let name:string;
      let description:string;
      let image:string;
      const nfts = await metaplex.nfts().findAllByCandyMachine(candyMachine,2);
      const nftsmetadata = nfts.map(nft => nft.metadataTask.run());
      Promise.all(nftsmetadata).then(metadataList =>{
        for(let i = 0; i < metadataList.length; i++){
          name = metadataList[i]['name'] ?? ''
          image = metadataList[i]['image'] ?? '';
          description = metadataList[i]['description'] ?? '';
          nft = {name: name, image: image,  description: description }
          nftList.push(nft);
        }
        setNFTS(nftList);
      }).catch(err => console.log(err));
    }
    loadCandyMachineMints();
    },[connection])

  return (
    <div>
      <div className='flex flex-row'>
      <div >
        <Typography>
          Dudesonchain NFT Collection 
        </Typography>
        <Typography>
          A collection of 10,000 unique dudes (non-fungible tokens) with proof of ownership stored 
          on the Solana blockchain. Each dude is automatically generated and programatically guaranteed 
          to be one of a kind, officially owned by a single person and minted using the Metaplex contract 
          (a Solana NFT standard).
        </Typography>
      </div>
      <Card>
        <CardMedia 
          component="img"
          height="400"
          width='300'
          image=''
          alt="dude">
        </CardMedia>
      </Card>
      </div>
        {NFTS.map(nft => (
           <NFTcard key={key++}image={nft.image} title={nft.name} description={nft.description}/>
        ))}
      </div>
  )
}
export default Main;
