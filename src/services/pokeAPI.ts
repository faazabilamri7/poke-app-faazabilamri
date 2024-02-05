import axios from 'axios';
import {PokemonAbility, PokemonDetail, PokemonList} from '../types/Pokemon';
import config from '../config/config';

const api = axios.create({
  baseURL: `${config.apiBaseUrl}/${config.apiVersion}`,
});

export const getPokemonList = async (limit: number, offset: number) => {
  const response = await api.get('pokemon', {
    params: {
      limit,
      offset,
    },
  });

  return response.data.results.map((item: PokemonList) => ({
    ...item,
    id: Number(item.url.split('/')[6]),
  }));
};

export const getPokemonDetails = async (id: number) => {
  const response = await api.get(`pokemon/${id}`);
  const abilitiesPromises = response.data.abilities.map(
    async (ability: any) => {
      const abilityResponse = await getAbilityDetails(ability.ability.name);
      return abilityResponse;
    },
  );

  const abilities = await Promise.all(abilitiesPromises);

  return {
    ...response.data,
    abilities,
  } as PokemonDetail;
};

export const getAbilityDetails = async (name: string) => {
  const response = await api.get(`ability/${name}`);
  return response.data as PokemonAbility;
};

export const getPokemonImage = (pokemonIndex: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
};
