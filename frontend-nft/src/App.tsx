import React from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import * as web3 from '@solana/web3.js';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Mint from './components/Mint';
import Holders from './components/Holders';
import Evolve from './components/Evolve';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App: React.FC = () => {
  const endpoint = web3.clusterApiUrl('devnet');
  const wallet = new PhantomWalletAdapter();
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[wallet]}>
        <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='mint' element={<Mint />} />
          <Route path='holders' element={<Holders />} />
          <Route path='evolve/:type' element={<Evolve />} />
        </Routes>
      </Router>
    </div>
    </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
