import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Valorant1 from './valo/Valorant'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Valorant1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
