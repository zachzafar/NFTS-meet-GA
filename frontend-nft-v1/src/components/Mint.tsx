import React from 'react';
import { Paper, Box, Button } from '@mui/material';

const Mint:React.FC = () => {
  return (
    <div className='grid place-items-center'>
      <Box
        sx={{
          '& > :not(style)': {
            m: 10,
            width: 500,
            height: 500,
          },
        }}
      >
        <Paper variant='outlined' elevation={3} />
      </Box>
      <Button variant='outlined'>Mint</Button>
    </div>
  );
}

export default Mint;