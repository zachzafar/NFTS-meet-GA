import React from 'react';
import { Paper, Box, Button } from '@mui/material';

function Mint() {
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
