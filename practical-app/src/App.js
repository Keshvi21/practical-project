import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Loader from './pages/Loader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResultSummary from './pages/ResultSummary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loader' element={<Loader />} />
        <Route path='/results' element={<ResultSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
