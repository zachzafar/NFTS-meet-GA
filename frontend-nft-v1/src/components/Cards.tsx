import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import {useParams} from 'react-router-dom';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
const Cards:React.FC = () => {
  let {type} = useParams();
  let stack:ReactJSXElement;

  switch (type) {
    case 'mutate':
    stack = (<div className="w-full h-full grid place-items-center mt-1 ml-3">
        <Card sx={{ maxWidth: 350 }}>
          <CardMedia 
          component="img"
          height="350"
          //image={}
          alt="dude">
          </CardMedia>
        </Card> 
    </div>)  
    break;
    case 'crossover':
    stack = ((<div className="w-full h-full grid place-items-center mt-1 ml-3">
        <Card sx={{ maxWidth: 350 }}>
          <CardMedia 
          component="img"
          height="350"
          //image={}
          alt="dude">
          </CardMedia>
        </Card> 
        </div>) )  
    break;
    default:
      stack = (<div>Hmm something wrong here</div>)
  }

  return stack;
}

export default Cards

