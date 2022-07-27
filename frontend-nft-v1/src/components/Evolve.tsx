import React, {useState,useEffect, Dispatch, SetStateAction} from 'react';
import {useParams} from 'react-router-dom'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box, Button, Card, CardMedia, Paper } from '@mui/material';
import ContentLibrary from './ContentLibrary';
import * as attributes from '../assets/utils/utils'
import {NFT} from './types/types'
import mergeImages from 'merge-images';
import {bundlrStorage, Metaplex, useMetaplexFileFromBrowser, walletAdapterIdentity} from '@metaplex-foundation/js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';


const Evolve:React.FC = () => {
  const [contentType, setContentType] = useState('');
  const [parent1NFT, setparent1NFT] = useState<NFT>()
  const [parent2NFT, setparent2NFT] = useState<NFT>()
  const [child1NFT, setchild1NFT] = useState<NFT>()
  const [child2NFT, setchild2NFT] = useState<NFT>()
  const {connection} = useConnection();
  const  wallet = useWallet();
  const {type}= useParams();
  let cards:ReactJSXElement;
  let sidebar:ReactJSXElement;
  let sidebarOptions:string[] = ['dudes','head decorations','layer 0','layer 1','layer 2','layer 3','layer 4','layer 5','layer 6','layer 7','layer 8','layer 9','layer 10','layer 11','layer 12','layer 13']
  let key = 0;

  const contentTypeMutator = (newContentType: string) => {
    if(contentType === newContentType){
      setContentType('')
    } else {
      setContentType(newContentType)
    }
  }
  const setParentNFT = (NFT:NFT) => {
      if(parent1NFT !== undefined && parent2NFT !== undefined){return}
      if(parent1NFT === undefined){
        setparent1NFT(NFT);
        return;
      } 
      if (parent2NFT === undefined){
        setparent2NFT(NFT);
        return;
      }
  }



const generateDudeNFT = (parents:string[],DNA:string[],setNft:Dispatch<SetStateAction<NFT | undefined>>) =>  {
  let recipe:{[key:string]:any} = [attributes.headdecoration,attributes.layer_0,attributes.layer_1,attributes.layer_2,attributes.layer_3,attributes.layer_4,attributes.layer_5,attributes.layer_6,attributes.layer_7,attributes.layer_8,attributes.layer_9,attributes.layer_10,attributes.layer_11,attributes.layer_12,attributes.layer_13]
  let ingredients = []
  let ingredientType;
  let ingredientNumber;
  let childNFT:NFT;
  let childDNA:string = ''
  
  
  for( let i = 0; i < DNA.length; i++){
    if(DNA[i] === '-1') {continue;}
    ingredientType = recipe[i]
    ingredientNumber = DNA[i]
    ingredients.push(ingredientType[ingredientNumber])
    childDNA = childDNA + ',' + DNA[i];
  }
  ingredients = ingredients.filter((ingredient: undefined | string) =>ingredient !== undefined);
  
  mergeImages(ingredients, {
    crossOrigin: 'anonymous',
  }).then(image =>{
      childNFT = { mint: '' , name: 'New Kid', image: image, description:'new description',DNA:childDNA, parentMintAddresses: parents}
      setNft(childNFT);
      
  })
}

  const crossover = (parent1NFT:NFT, parent2NFT:NFT) => {
    if(parent1NFT.DNA === undefined || parent2NFT.DNA === undefined) {
      console.log("crossover function was called but DNA in parents not present")
      return
    }
    let parent1DNA = parent1NFT.DNA.split(',')
    let parent2DNA = parent2NFT.DNA.split(',')
    let child1DNA:string[] = [];
    let child2DNA:string[] = [];
    for(let i=0; i < Math.round(parent1DNA.length/2); i++) {
        child1DNA.push(parent1DNA[i])
    }
    for(let i=8; i < parent1DNA.length; i++) {
        child1DNA.push(parent1DNA[i])
    }
    for(let i=0; i < Math.round( parent2DNA.length/2); i++) {
        child2DNA.push(parent2DNA[i])
    }
    for(let i=8; i < parent2DNA.length; i++) {
        child2DNA.push(parent2DNA[i])
    }
    generateDudeNFT([parent1NFT.mint,parent2NFT.mint],child1DNA,setchild1NFT)
    generateDudeNFT([parent1NFT.mint,parent2NFT.mint],child2DNA,setchild2NFT)
  }

  const mutate = (parentNFT:NFT,attributeType?:string,attributeIndex?:string) => {
    if(parentNFT.DNA === undefined) {
      console.log('mutate function was called but parent dna not present')
      return
    }
    let childDNA = parentNFT.DNA.split(',')
    if(attributeType && attributeIndex){
      let attribute = sidebarOptions.indexOf(attributeType)
      childDNA[attribute - 1] = attributeIndex
    }
    generateDudeNFT([parentNFT.mint],childDNA,setchild1NFT);
  }

  const mint =  async (NFT:NFT) => {
    if (wallet === null) {return};
    console.log('minting....')
    let res = await fetch(NFT.image)
    let data = await res.blob()
    let metadata = {
      type: 'image/png'
    }
    let file = new File([data],'image.png',metadata)
    let parentAddress1 = ''
    let parentAddress2 = ''
    if(NFT.parentMintAddresses !== undefined){
      parentAddress1 = NFT.parentMintAddresses[0] ?? ''
      parentAddress2 = NFT.parentMintAddresses[1] ?? ''
    }
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const metaplex = new Metaplex(connection).use(walletAdapterIdentity(wallet)).use(bundlrStorage({
    address: 'https://devnet.bundlr.network',
    providerUrl: 'https://api.devnet.solana.com',
    timeout: 60000,
}));
    const { uri } = await metaplex.nfts().uploadMetadata({
      "name": "new Number #0001",
    "symbol": "NB",
  "description": "Collection of 10 numbers on the blockchain. This is the number 1/10.",
  "seller_fee_basis_points": 500,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  "image": await useMetaplexFileFromBrowser(file),
  "attributes": [
    { "trait_type": "DNA", "value": NFT.DNA },
    { "trait_type": "Parent-1", "value": parentAddress1 },
    { "trait_type": "Parent-2", "value": parentAddress2 },
  ],
  "properties": {
    "creators": [
      {
        "address": "9GibCRCBNaTPTphDBbvD19onKZqQJPLeY5Zv8gCWWhcm",
        "share": 100
      }
    ],
    "files": [{ "uri": "0.png", "type": "image/png" }]
  },
  "collection": { "name": "numbers", "family": "numbers" }
    })


    const { nft } = await metaplex.nfts().create({
      uri: uri,
    })
    console.log(nft)
  }

  const burn = (NFT:NFT) => {
    return 
  }

  const mintAndBurn = () => {
    if(!child1NFT && !child2NFT){return}
    console.log('minting and burning')
    if(child1NFT && parent1NFT){
      console.log('minting new mutation');
      mint(child1NFT)
      burn(parent1NFT)
    } else if (child1NFT && child2NFT && parent1NFT && parent2NFT){
      console.log('minting new crossover')
      mint(child1NFT)
      mint(child2NFT)
      burn(parent1NFT)
      burn(parent2NFT)
    }

  }

  switch (type) {
    case 'mutate':
    if(parent1NFT && child1NFT === undefined){mutate(parent1NFT)}
    cards = (<div className="w-full h-full grid place-items-center mt-1 ml-3">
        <Card sx={{ maxWidth: 300 }}>
          {parent1NFT ? <CardMedia 
          component="img"
          height="300"
          image={parent1NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 300,
            height: 300,
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card> 
         <Card sx={{ maxWidth: 300 }}>
          {child1NFT ?
          <CardMedia 
          component="img"
          height="300"
          image={child1NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 300,
            height: 300,
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card>
        {child1NFT ? <Button variant='outlined' onClick={() => {mintAndBurn()}}>Mint</Button> : null}
        </div>)  
    break;
    case 'crossover':
       if(parent1NFT && parent2NFT && child1NFT === undefined){crossover(parent1NFT,parent2NFT);}
    cards = ((<div className="w-full h-full grid place-items-center">
        <div className="flex flex-row">
          <Card sx={{ maxWidth: 300 }}>
          {parent1NFT ? <CardMedia 
          component="img"
          height="300"
          image={parent1NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 300,
            height: 300,
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card> 
         <Card sx={{ maxWidth: 300 }}>
          {parent2NFT ?
          <CardMedia 
          component="img"
          height="300"
          image={parent2NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 300,
            height: 300,
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card>
      </div>
      <div className='flex flex-row'>
        <Card sx={{ maxWidth: 300 }}>
          {child1NFT ? 
          <div>
          <CardMedia 
          component="img"
          height="300"
          image={child1NFT.image}
          alt="dude">
          </CardMedia> 
          </div>
          : <Box
        sx={{
          '& > :not(style)': {
            width: 300,
            height: 300,
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card> 
         <Card sx={{ maxWidth: 300 }}>
          {child2NFT ?
          <CardMedia 
          component="img"
          height="300"
          image={child2NFT.image}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 300,
            height: 300,
          },
        }}
      >
        <Paper variant='outlined' elevation={0} />
      </Box>}
        </Card>
      </div>
     {child1NFT && child2NFT ? 
      <form onSubmit={(event) => {mintAndBurn()}}>
      <input type='file' value={child1NFT.image}/>

      <input type="submit" value="Mint"></input>
      </form>
     :null}    
        </div>) )  
    break;
    default:
      cards = (<div>Hmm something wrong here</div>)
  }

  
  sidebar =  ( <div className='h-full flex flex-row'>
      <div className='flex flex-col w-40 bg-sky-900 overflow-x-hidden justify-evenly' >
        {sidebarOptions.map(option => (
          <Button className='p-0 text-xs' key={key++} onClick={() => contentTypeMutator(option)}>
          {option}
          </Button>
        ))}
      </div>
      {contentType === '' ? null: <ContentLibrary mutate={mutate} setParentNFT={setParentNFT} contentType={contentType} parentNFT={parent1NFT}/> }
    </div>)

    useEffect(() => {
    setchild1NFT(undefined)
    setchild2NFT(undefined)
    setparent1NFT(undefined)
    setparent2NFT(undefined)
  },[type])

  return (
  <div className='flex flex-row h-full'>
    {sidebar}
    {cards}
   
  </div>
  );
}

export default Evolve;







 
