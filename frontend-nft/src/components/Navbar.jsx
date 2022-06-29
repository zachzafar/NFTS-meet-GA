import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';

function Navbar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          dudesonchain
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/mint' color='inherit'>
            Mint
          </Button>

          <Button component={Link} to='/holders' color='inherit'>
            Holders
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
