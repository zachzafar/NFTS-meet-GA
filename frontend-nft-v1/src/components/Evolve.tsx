import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box, Button, Card, CardMedia, Paper } from '@mui/material';
import ContentLibrary from './ContentLibrary';
import * as attributes from '../assets/utils/utils'
import {imageGenerator} from '../function';
import {NFT} from './types/types'
const Evolve:React.FC = () => {
  const [contentType, setContentType] = useState('');
  const [parent1NFT, setparent1NFT] = useState<NFT>()
  const [parent2NFT, setparent2NFT] = useState<NFT>()
  const [child1NFT, setchild1NFT] = useState<NFT>()
  const [child2NFT, setchild2NFT] = useState<NFT>()
  const {type}= useParams();
  let cards:ReactJSXElement;
  let sidebar:ReactJSXElement;
  let sidebarOptions:string[];
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
      } 
      if (parent1NFT === undefined){
        setparent2NFT(NFT);
      }
  }

  const crossover = (parent1NFT:NFT, parent2NFT:NFT) => {
    if(parent1NFT.DNA === undefined || parent2NFT.DNA === undefined) {return}
    let child1:NFT;
    let child2:NFT;
    let child1DNA:string[] = [];
    let child2DNA:string[] = [];
    let childImage1;
    let childImage2;
    for(let i=0; i < Math.round(parent1NFT.DNA.length/2); i++) {
        child1DNA.push(parent1NFT.DNA[i])
    }
    for(let i=8; i < parent1NFT.DNA.length; i++) {
        child1DNA.push(parent1NFT.DNA[i])
    }
    for(let i=0; i < Math.round( parent2NFT.DNA.length/2); i++) {
        child2DNA.push(parent2NFT.DNA[i])
    }
    for(let i=8; i < parent2NFT.DNA.length; i++) {
        child2DNA.push(parent2NFT.DNA[i])
    }
    childImage1 = generateDudeImage(child1DNA,'1')
    childImage2 = generateDudeImage(child2DNA,'2')

    child1 = {name: 'New Kid', image: childImage1, description:'new description'}
    child2 = {name: 'New Kid', image: childImage2, description:'new description'}
    setchild1NFT(child1)
    setchild2NFT(child2)
  }

  const mutate = (parentNFT:NFT) => {
    let childImage:string;
    let child:NFT;
    if(parentNFT.DNA === undefined) {return}
    let childDNA = [...parentNFT.DNA]
    childImage = generateDudeImage(childDNA,'1');
    child = {name: 'New Kid', image: childImage, description:'new description'}
    setchild1NFT(child)
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
          {child1NFT ? <CardMedia 
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
          
        </div>) )  
    break;
    default:
      cards = (<div>Hmm something wrong here</div>)
  }

    useEffect(() => {
    setchild1NFT(undefined)
    setchild2NFT(undefined)
  },[type])

  sidebarOptions = ['dudes','head decorations','layer 0','layer 1','layer 2','layer 3','layer 4','layer 5','layer 6','layer 7','layer 8','layer 9','layer 10','layer 11','layer 12','layer 13']
  sidebar =  ( <div className='h-full flex flex-row'>
      <div className='flex flex-col w-40 bg-sky-900 overflow-x-hidden justify-evenly' >
        {sidebarOptions.map(option => (
          <Button className='p-0 text-xs' key={key++} onClick={() => contentTypeMutator(option)}>
          {option}
          </Button>
        ))}
      </div>
      {contentType === '' ? null: <ContentLibrary mutate={mutate} setParentNFT={setParentNFT} contentType={contentType} /> }
    </div>)

  return (
  <div className='flex flex-row h-full'>
    {sidebar}
    {cards}
  </div>
  );
}

export default Evolve;


const generateDudeImage = (DNA:string[],index:string):string =>  {
  let recipe:{[key:string]:any} = [attributes.headdecoration,attributes.layer_0,attributes.layer_1,attributes.layer_2,attributes.layer_3,attributes.layer_4,attributes.layer_5,attributes.layer_6,attributes.layer_7,attributes.layer_8,attributes.layer_9,attributes.layer_10,attributes.layer_11,attributes.layer_12,attributes.layer_13]
  let ingredients = []
  let ingredientType;
  let ingredientNumber;
  let image_filename = `../assets/children/${index}-child.png`
  
  for( let i = 0; i < DNA.length; i++){
    ingredientType = recipe[i]
    ingredientNumber = DNA[i]
    ingredients.push(ingredientType[ingredientNumber])
  }
  //imageGenerator(ingredients,image_filename);
  
  return image_filename;
  
}
