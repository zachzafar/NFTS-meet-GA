import React from 'react'
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import {Typography} from '@mui/material'


const LoginHolders:React.FC = () => {
    
  return (
        <div className='bg-gray-900 h-full w-full grid place-items-center'>
      <div className='p-14 text-center bg-gray-800 shawdow-lg rounded-lg flex flex-col place-items-center'>
        <div>
          <Typography variant='h5'>Sign in to Holders Area</Typography>
        </div>
        <WalletMultiButton/>
      </div>
    </div>
  )
}

export default LoginHolders