import logo from './logo.svg';
import './App.css';
// import Home from './pages/Home';
// import Loader from './pages/Loader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ResultSummary from './pages/ResultSummary';
import Login from './components/Login';
import SiteList from './components/SiteList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<SiteList />} />
        {/* <Route path='/results' element={<ResultSummary />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
