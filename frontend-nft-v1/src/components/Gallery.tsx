import React, {useEffect} from 'react'
import NFTcard from './NFTcard';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {Metaplex} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js';
import useAppContext from '../func/appContext';

interface NFT {
  name: string,
  image: string,
  description: string,
}

const Gallery:React.FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { saveNFTs,NFTs } = useAppContext();
    let key= 0;

    

    useEffect( () => {
      if(publicKey === null) {return;}
      const collectionAddress:PublicKey = new PublicKey(`${process.env.REACT_APP_CANDY_MACHINE_MINT_ADDRESS}`)
      const metaplex = new Metaplex(connection);
      const loadNFTs =  async () => {
      let nft:NFT;
      let nftList:NFT[] = [];
      let name:string;
      let description:string;
      let image:string;
      let nftCollectionAddress;
      let nfts = await metaplex.nfts().findAllByOwner(publicKey)
      nfts = nfts.filter((nft)=> {
        nftCollectionAddress = nft['collection'] ?? null;
        return (nftCollectionAddress !== null && collectionAddress.equals(nftCollectionAddress['key'])) 

      });
      const nftsmetadata = nfts.map(nft => nft.metadataTask.run())
      Promise.all(nftsmetadata).then(metadataList =>{
        for(let i = 0; i < metadataList.length; i++){
          name = metadataList[i]['name'] ?? ''
          image = metadataList[i]['image'] ?? '';
          description = metadataList[i]['description'] ?? '';
          nft = {name: name, image: image,  description: description }
          nftList.push(nft);
        }
        saveNFTs(nftList);

      }).catch(err => console.log(err));
    }
    loadNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[publicKey,connection])


  
  return (
    <div>
        {NFTs.map(nft => (
           <NFTcard key={key++}image={nft.image} title={nft.name} description={nft.description}/>
        ))}
      </div>
  )
}

export default Gallery