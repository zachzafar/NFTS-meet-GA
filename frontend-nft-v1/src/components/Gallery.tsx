import React, {useEffect} from 'react'
import NFTcard from './NFTcard';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {JsonMetadataAttribute, Metaplex} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js';
import useAppContext from './context/appContext';
import {NFT} from './types/types'


/**
 * Displays all of the Dude NFTs owned by the user
 * @returns {ReactJSXElement} 
 */
const Gallery:React.FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { saveNFTs,NFTs } = useAppContext();
    let key= 0;

    /**
     * Loads all NFTs owned by user that are from the Nft collection
     * @returns {void} updates the the AppContext State with the Nfts
     */
    const loadUserNFTs =  async () => {
      if(publicKey === null) {return;}
      const collectionAddress:PublicKey = new PublicKey(`${process.env.CANDY_MACHINE_MINT_ADDRESS}`)
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
      let nftCollectionAddress;
      let nftName;
      let parentAttribute:JsonMetadataAttribute
      let nfts = await metaplex.nfts().findAllByOwner(publicKey)
      nfts = nfts.filter((nft)=> {
        nftCollectionAddress = nft['collection'] ?? null;
        nftName = nft['name'] ?? ''
        return ((nftCollectionAddress !== null && collectionAddress.equals(nftCollectionAddress['key'])) || nftName === 'DudeOnChain' )

      });
      const nftsmetadata = nfts.map(nft => nft.metadataTask.run())
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
          nft = {name: name, image: image,  description: description, DNA:DNA, mint:mint,parentMintAddresses:[parent1MintAddress,parent2MintAddress]}
          nftList.push(nft);
        }
        saveNFTs(nftList);

      }).catch(err => console.log(err));
    }

    useEffect( () => {
    loadUserNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[publicKey,connection])


  
  return (
    <div className="grid grid-cols-4 gap-1  place-items-center container mx-auto mt-10">
        {NFTs.map(nft => (
           <NFTcard key={key++} NFT={nft}/>
        ))}
      </div>
  )
}

export default Gallery