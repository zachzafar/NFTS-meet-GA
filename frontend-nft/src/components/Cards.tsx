import React from 'react';
import {Paper, Box} from '@mui/material';
import {useParams} from 'react-router-dom';
const Cards:React.FC = () => {
  let {type} = useParams();

  return (
    <div className="w-auto grid place-items-center mt-1 ml-3">
        <Box
          sx={{ 
            '& > :not(style)': {
                m: 1,
                width: 350,
                height: 350,
            },
          }}
        >
            <Paper variant='outlined' elevation={3}/>
        </Box>
        <Box
          sx={{ 
            '& > :not(style)': {
                m: 1,
                width: 350,
                height: 350,
            },
          }}
        >
            <Paper variant='outlined' elevation={3}/>
        </Box>
         <h1>{type}</h1>
    </div>
   
  )
}

export default Cards