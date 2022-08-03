import React, { useEffect, useState } from 'react'
import { NFT } from './types/types'
import NFTcard from './NFTcard'
import { JsonMetadataAttribute, Metaplex, Nft } from '@metaplex-foundation/js'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'


interface Props {
  NFT:NFT|undefined
}

const  FamilyTree:React.FC<Props> = ({NFT}) => {
  const [parentNFTs, setparentNFTs] = useState<NFT[]>()
  const { connection } = useConnection();
  let key = 0;
  
  useEffect(() => {
    if(NFT === undefined){return}
    let mintlist:PublicKey[] = []
    let parentAddress1 = ''
    let parentAddress2 = ''
    if(NFT.parentMintAddresses !== undefined){
      parentAddress1 = NFT.parentMintAddresses[0] ?? ''
      parentAddress2 = NFT.parentMintAddresses[1] ?? ''
    }
    if(parentAddress1 === '') {return}
    mintlist.push(new PublicKey(parentAddress1))
    if(parentAddress2 !== '') mintlist.push(new PublicKey(parentAddress2))
    const metaplex = new Metaplex(connection);
    const loadNFTs =  async () => {
      let nftList:NFT[] = [];
      let name:string;
      let description:string;
      let image:string;
      let mint:string;
      let DNA:string;
      let parent1MintAddress:string;
      let parent2MintAddress:string;
      let nfts = await metaplex.nfts().findAllByMintList(mintlist)
      let nftlist:Nft[] = []
      let nft:NFT;
      let returnedValue:Nft|null
      let parentAttribute:JsonMetadataAttribute
      for(var i = 0; i < nfts.length; i++){
        returnedValue = nfts[i]
        if(returnedValue !== null){
          nftlist.push(returnedValue)
        } 
      }
      const nftsmetadata = nftlist.map(nft =>  nft.metadataTask.run())
      Promise.all(nftsmetadata).then(metadataList =>{
      for(let i = 0; i < metadataList.length; i++){
          name = metadataList[i]['name'] ?? ''
          image = metadataList[i]['image'] ?? '';
          description = metadataList[i]['description'] ?? '';
          returnedValue= nfts[i]
          if(returnedValue !== null){
          mint = returnedValue['mint'].toString() ?? ''
          } 
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
          nft = {name: name, image: image,  description: description, DNA:DNA, mint:mint,parentMintAddresses:[parent1MintAddress, parent2MintAddress]}
          nftList.push(nft);
        }
        setparentNFTs(nftList);
    }).catch(err => console.log(err));  
  }
  loadNFTs();
},[NFT, connection])
  
  return (
    <div className='h-full w-full place-items-center flex flex-col'>
      {NFT !== undefined ? <NFTcard NFT={NFT}/> : null}
      <div className='flex flex-row'>
      {parentNFTs ? parentNFTs.map(nft => (
        <FamilyTree key={key++} NFT={nft}/>
      )): null}
      </div>
    </div>
  )
}

export default FamilyTree