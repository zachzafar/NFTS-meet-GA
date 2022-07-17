import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box, Button, Card, CardMedia, Paper } from '@mui/material';
import ContentLibrary from './ContentLibrary';
const Evolve:React.FC = () => {
  const [images,setImages] = useState<string[]>([])
  const [contentType, setContentType] = useState('');
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
  const setImageUrls = (img:string) => {
      if(images.length === 2){return}
      let newImageArray = [...images];
      newImageArray.push(img);
      setImages(newImageArray);
  }

  switch (type) {
    case 'mutate':
    cards = (<div className="w-full h-full flex flex-row place-items-center mt-1 ml-3">
        <Card sx={{ maxWidth: 300 }}>
          {images[0] ? 
          <CardMedia 
          component="img"
          height="300"
          image={images[0]}
          alt="dude">
          </CardMedia> : null}
        </Card> 
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia 
          component="img"
          height="300"
          image=''
          alt="dude">
          </CardMedia>
        </Card>
    </div>)  
    break;
    case 'crossover':
    cards = ((<div className="w-full h-full grid place-items-center mt-1 ml-3">
        <Card sx={{ maxWidth: 300 }}>
          {images[0] ? <CardMedia 
          component="img"
          height="300"
          image={images[0]}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 300,
            height: 300,
          },
        }}
      >
        <Paper variant='outlined' elevation={3} />
      </Box>}
        </Card> 
         <Card sx={{ maxWidth: 300 }}>
          {images[1] ?
          <CardMedia 
          component="img"
          height="300"
          image={images[1]}
          alt="dude">
          </CardMedia> : <Box
        sx={{
          '& > :not(style)': {
            width: 300,
            height: 300,
          },
        }}
      >
        <Paper variant='outlined' elevation={3} />
      </Box>}
        </Card>  
        </div>) )  
    break;
    default:
      cards = (<div>Hmm something wrong here</div>)
  }

    useEffect(() => {
    setImages([])
  },[type])

  sidebarOptions = ['dudes','head decorations','layer 0','layer 1','layer 2','layer 3','layer 4','layer 5','layer 6','layer 7','layer 8','layer 9','layer 10','layer 11','layer 12','layer 13']
  sidebar =  ( <div className='w-4/12 h-full flex flex-row'>
      <div className='flex flex-col w-5/12 pl-3 bg-sky-900 overflow-x-hidden justify-evenly' >
        {sidebarOptions.map(option => (
          <Button key={key++} onClick={() => contentTypeMutator(option)}>
          {option}
          </Button>
        ))}
      </div>
      {contentType === '' ? null: <ContentLibrary setImageUrls={setImageUrls} contentType={contentType} /> }
    </div>)

  return (
  <div className='flex flex-row h-full'>
    {sidebar}
    {cards}
  </div>
  );
}

export default Evolve;
