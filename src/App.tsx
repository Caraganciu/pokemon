import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetailPage from './pages/PokemonDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/pokemon/:id" Component={PokemonDetailPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;