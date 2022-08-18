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
import useAppContext from './components/context/appContext';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Mint from './components/Mint';
import Holders from './components/Holders';
import Evolve from './components/Evolve';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NFTModal from './components/NFTModal';
import FamilyTree from './components/FamilyTree';
require('@solana/wallet-adapter-react-ui/styles.css');

/**
 * Root of the component tree this component is rendered in the index.ts file and is the main component of the application
 */
const App: React.FC = () => {
  const {modalStatus,modalNft} = useAppContext();
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

  const darkTheme = createTheme({
    palette:{
      mode: 'dark',
    },
  });

  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline/>
            <div className='flex flex-col h-screen'>
              <Router>
              <Navbar />
            <div className='h-full'>                
              <Routes>
                <Route path='/' element={<Main data-testid='main-component'/>} />
                <Route path='mint' element={<Mint data-testid='mint-component'/>} />
                <Route path='holders' element={<Holders data-testid='holders-component'/>} />
                <Route path='evolve/:type' element={<Evolve data-testid='evolve-component'/>} />
                <Route path='familyTree' element={<FamilyTree NFT={modalNft} data-testid='modal'/>} />
              </Routes>
            </div>
             {modalStatus && modalNft ? <NFTModal NFT={modalNft}/> : null}
              </Router>
             
            </div> 
            </ThemeProvider>
    </WalletModalProvider>
    </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
