import Navbar from './components/Navbar';
import Main from './components/Main';
import Mint from './components/Mint';
import Holders from './components/Holders';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='mint' element={<Mint />} />
          <Route path='holders' element={<Holders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
