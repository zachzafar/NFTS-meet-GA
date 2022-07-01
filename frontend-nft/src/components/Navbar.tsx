import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';

function Navbar() {
  let { pathname } = useLocation();
  let stack;
  switch (pathname) {
    case '/':
      stack = (
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/mint' color='inherit'>
            Mint
          </Button>
          <Button component={Link} to='/holders' color='inherit'>
            Holders
          </Button>
        </Stack>
      );
      break;
    case '/mint':
      stack = (
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/' color='inherit'>
            Home
          </Button>
        </Stack>
      );
      break;
    case '/holders':
      stack = (
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/evolve' color='inherit'>
            Evolve
          </Button>
          <Button component={Link} to='/mint' color='inherit'>
            Mint
          </Button>
          <Button component={Link} to='/' color='inherit'>
            Home
          </Button>
        </Stack>
      );
      break;
    case '/evolve':
      stack = (
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/' color='inherit'>
            Home
          </Button>
          <Button component={Link} to='/holders' color='inherit'>
            Holders
          </Button>
          <Button color='inherit'>Crossover</Button>
          <Button color='inherit'>Mutate</Button>
        </Stack>
      );
      break;
    default:
      stack = null;
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          dudesonchain
        </Typography>
        {stack}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
