import React,{useState,useEffect} from 'react';
import useAppContext from '../func/appContext'
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';

interface Props {
  contentType:string;
}

interface NFT {
  name: string,
  image: string,
  description: string,
}


const ContentLibrary: React.FC<Props> = ({contentType}) => {
  const [dudes,setDudes] = useState<NFT[]>([])
  const {NFTs} =useAppContext();
  
  let stack;
  let key = 0;

  switch (contentType) {
    case 'dudes':
      stack = (dudes.map(d => (
        <Card sx={{ maxWidth: 145 }} key={key++}>
          <CardMedia 
          component="img"
          height="240"
          image={d.image}
          alt="dude">
          </CardMedia>
        </Card>
      )))
      break;
    case 'attributes':
    break;
    default: 
    break;
  }

  useEffect(() =>{
  setDudes(NFTs);
  },[NFTs]);
  
  return(
    <div className='w-full bg-sky-800 h-full'>
      {stack}
    </div>);
}

export default ContentLibrary;
