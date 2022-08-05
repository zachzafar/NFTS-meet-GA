import React, {useState,useEffect} from 'react'
import NFTcard from './NFTcard';
import {useConnection} from '@solana/wallet-adapter-react';
import {JsonMetadataAttribute, Metaplex} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js';
import {NFT} from './types/types';
import { Button, Typography, CircularProgress, Box } from '@mui/material';

/**
 * Displays landing page as well as Dudes that have already been minted
 * @returns {ReactJSXElement}
 */
const Main:React.FC = () => {
  const [NFTS, setNFTS] = useState<NFT[]>([]);
  const { connection } = useConnection();
  let key= 0;

  /**
   * Loads Nfts that have already been minted from the candyMachine and updates the component state with a list of NFT objects
   * @returns {void} updates the NFTS state of the Main component 
   */
  const loadCandyMachineMints =  async () => {
      const candyMachine = new PublicKey(`${process.env.REACT_APP_CANDY_MACHINE_ID}`);
      const metaplex = new Metaplex(connection);
      let nft:NFT;
      let nftList:NFT[] = [];
      let name:string;
      let description:string;
      let image:string;
      let mint:string;
      let DNA:string;
      let parent1MintAddress:string;
      let parent2MintAddress:string;
      let parentAttribute:JsonMetadataAttribute
      const nfts = await metaplex.nfts().findAllByCandyMachine(candyMachine,2);
      const nftsmetadata = nfts.map(nft => nft.metadataTask.run());
      Promise.all(nftsmetadata).then(metadataList =>{
        for(let i = 0; i < metadataList.length; i++){
          name = metadataList[i]['name'] ?? ''
          image = metadataList[i]['image'] ?? '';
          description = metadataList[i]['description'] ?? '';
          mint = nfts[i]['mint'].toString() ?? ''
          if(metadataList[i]['attributes'] !== undefined){
              let attributes = metadataList[i]['attributes']
              if (attributes !== undefined) {
                DNA = attributes[0]['value']?.replace(/\s/g,'') ?? ''
                parentAttribute = attributes[1] ?? ''
                if(parentAttribute !== undefined){
                  parent1MintAddress = parentAttribute['value'] ?? ''
                }
                parentAttribute = attributes[2] ?? ''
                if(parentAttribute !== undefined){
                  parent2MintAddress = parentAttribute['value'] ?? ''
                }
              }
          }
          
          nft = {name: name, image: image,  description: description, DNA:DNA, mint: mint,parentMintAddresses: [parent1MintAddress, parent2MintAddress]}
          nftList.push(nft);
        }
        setNFTS(nftList);
      }).catch(err => console.log(err));
    }
  
    
  useEffect( () => {
    loadCandyMachineMints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[connection])

  return (
    <div className=' flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center p-36'>
        <Typography variant='h2' className='py-7'>
          Dudesonchain NFT Collection 
        </Typography>
        <Typography variant='h6'>
          A collection of 10,000 unique dudes (non-fungible tokens) with proof of ownership stored 
          on the Solana blockchain. Each dude is automatically generated and programatically guaranteed 
          to be one of a kind, officially owned by a single person and minted using the Metaplex contract 
          (a Solana NFT standard).
        </Typography>
        <Button className='mt-10' variant='contained' size='large'>Mint Now</Button>
      </div>
      <Typography variant='h3' >Minted Dudes</Typography>
        {NFTS.length===0? 
         <Box className='pt-5'>
        <CircularProgress/>
        </Box>
        :  <div className="grid grid-cols-4 gap-1 place-items-center container mx-auto mt-10">
        {NFTS.map(nft => (
           <NFTcard key={key++} NFT={nft}/>
        ))}
        </div>}
        
      </div>
  )
}
export default Main;
