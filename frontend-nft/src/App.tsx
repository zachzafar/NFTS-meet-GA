import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Mint from './components/Mint';
import Holders from './components/Holders';
import Evolve from './components/Evolve';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='mint' element={<Mint />} />
          <Route path='holders' element={<Holders />} />
          <Route path='evolve' element={<Evolve />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
