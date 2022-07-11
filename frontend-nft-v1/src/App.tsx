import React, {useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {
    CoinbaseWalletAdapter,
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import {AppProvider} from './func/appContext';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Mint from './components/Mint';
import Holders from './components/Holders';
import Evolve from './components/Evolve';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
require('@solana/wallet-adapter-react-ui/styles.css');


const App: React.FC = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
        () => [
            new CoinbaseWalletAdapter(),
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <AppProvider>
            <div className='flex flex-col h-screen'>
              <Router>
              <Navbar />
            <div className='h-full'>                
              <Routes>
                <Route path='/' element={<Main />} />
                <Route path='mint' element={<Mint />} />
                <Route path='holders' element={<Holders />} />
                <Route path='evolve/:type' element={<Evolve />} />
              </Routes>
            </div>

              </Router>
            </div> 
          </AppProvider>
    </WalletModalProvider>
    </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
