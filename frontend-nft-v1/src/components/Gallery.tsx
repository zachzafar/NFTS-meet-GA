import React, {useState,useEffect} from 'react'
import NFTcard from './NFTcard';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {Metaplex} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js';

interface NFT {
  name: string,
  image: string,
  description: string,
}

const Gallery:React.FC = () => {
    const [NFTS, setNFTS] = useState<NFT[]>([]);
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    let key= 0;

    

    useEffect( () => {
      if(publicKey === null) {return;}
      const collectionAddress:PublicKey = new PublicKey("BEmm53XQpy54vDSZ8efN9CxTwtbrCSXqezUvifoKmvZv")
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
        setNFTS(nftList);
      }).catch(err => console.log(err));
    }
    loadNFTs();
    },[publicKey,connection])


  
  return (
    <div>
        {NFTS.map(nft => (
           <NFTcard key={key++}image={nft.image} title={nft.name} description={nft.description}/>
        ))}
      </div>
  )
}

export default Gallery