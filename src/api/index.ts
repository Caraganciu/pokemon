import { PokemonClient } from 'pokenode-ts';

const P = new PokemonClient();

type Type = {
  slot: number,
  type: {
    name: string,
    url: string
  }
}

type Pokemon = {
  id: number,
  name: string,
  weight: number,
  height: number,
  types: Type[]
}

export type DetailedPokemon = Omit<Pokemon, "types"> & {

  image: string,
  types: string[]
}

export async function getPokemons(): Promise<DetailedPokemon[]> {
  const data = await P.listPokemons();
  const promises = []
  for (const pokemon of data.results){
    const details = P.getPokemonByName(pokemon.name);
    promises.push(details)
  }
  const detailedPokemons: DetailedPokemon[] = [];
  return Promise.all(promises).then((results)=>{
    data.results.forEach((pokemon, index)=>{
      const detail: Pokemon = results[index];
      detailedPokemons.push({
        ...pokemon,
        ...detail,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detail.id}.png`,
        types: detail.types.map((type: Type) => type.type.name)
      })
    })
    return detailedPokemons;
  })
}

export async function getTypes(): Promise<string[]> {
  const data = await P.listTypes();
  return data.results.map((type)=> type.name)
}

export async function getPokemonDetails(id: string): Promise<DetailedPokemon> {
  const data = await P.getPokemonByName(id);
  return {
    id: data.id,
    name: data.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
    weight: data.weight,
    height: data.height,
    types: data.types.map((type: Type) => type.type.name)
  };
}