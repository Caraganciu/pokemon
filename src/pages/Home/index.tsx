import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DetailedPokemon, getTypes, getPokemons } from '../../api';
import './styles.css';

const Home = () => {
  const [query, setQuery] = useState(localStorage.getItem("query") || '');
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(localStorage.getItem("type") || '');
  const [results, setResults] = useState<DetailedPokemon[]>([]);

  useEffect(()=>{
    getPokemons().then((data)=>setResults(data));
    getTypes().then((types)=> setTypes(types));
  }, [])

  const pokemons = useMemo(()=>{
    return results.filter((result: DetailedPokemon)=>
      result.name.toLowerCase().includes(query.toLowerCase())
        && (!type || result.types.includes(type)))
  }, [query, results, type])

  const onInput = useCallback((e)=>{
    setQuery(e.target.value);
    localStorage.setItem("query", e.target.value);
  }, [])

  const onFilter = useCallback((e)=>{
    setType(e.target.value)
    localStorage.setItem("type", e.target.value);
  }, [])

  return (
    <div className='search-page'>
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={onInput}
      />
      <select value={type} onChange={onFilter}>
        <option value="">All Types</option>
        {
          types.map((type, id)=><option key={id} value={type}>{type}</option>)
        }
      </select>
      <ul>
        {pokemons.map((pokemon: DetailedPokemon) => (
          <li key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.name}`}>
              <img src={pokemon.image} alt={pokemon.name} />
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;