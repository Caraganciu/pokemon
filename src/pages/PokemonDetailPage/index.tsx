import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedPokemon, getPokemonDetails } from '../../api';
import './styles.css';

const PokemonDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<DetailedPokemon>();

  useEffect(() => {
    getPokemonDetails(id).then((data)=>setPokemon(data));
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="container detail-container">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>Type: {pokemon.types.join(', ')}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default PokemonDetailPage;