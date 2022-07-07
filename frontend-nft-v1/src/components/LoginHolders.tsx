import React from 'react'
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';


const LoginHolders:React.FC = () => {
    
  return (
        <div className='bg-gray-100 h-screen w-auto grid place-items-center'>
      <div className='p-24 text-center bg-white shawdow-lg rounded-lg'>
        <div>
          <h1>Sign in to Holders Area</h1>
        </div>
        <WalletMultiButton/>
      </div>
    </div>
  )
}

export default LoginHolders