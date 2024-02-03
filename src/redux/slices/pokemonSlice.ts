import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../store';
import {getPokemonList, getPokemonDetails} from '../../services/pokeAPI';
import {PokemonDetail, PokemonList} from '../../types/Pokemon';

interface PokemonState {
  list: PokemonList[];
  detailPokemon: PokemonDetail | null;
  selectedPokemon1: PokemonList | null;
  selectedPokemon2: PokemonList | null;
  selectedDetailPokemon1: PokemonDetail | null;
  selectedDetailPokemon2: PokemonDetail | null;
}

const initialState: PokemonState = {
  list: [],
  detailPokemon: null,
  selectedPokemon1: null,
  selectedPokemon2: null,
  selectedDetailPokemon1: null,
  selectedDetailPokemon2: null,
};

const pokemonSlice = createSlice({
  name: 'pokemonState',
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<Array<any>>) => {
      const uniqueKeys = new Set(state.list.map(item => item.id));

      state.list = [
        ...state.list,
        ...action.payload.filter(item => !uniqueKeys.has(item.id)),
      ];
    },
    detailPokemon: (state, action: PayloadAction<any>) => {
      state.detailPokemon = action.payload;
    },
    clearSelectedPokemon: state => {
      state.detailPokemon = null;
    },
    selectPokemon1: (state, action: PayloadAction<any>) => {
      state.selectedPokemon1 = action.payload;
    },
    selectPokemon2: (state, action: PayloadAction<any>) => {
      state.selectedPokemon2 = action.payload;
    },
    selectDetailPokemon1: (state, action: PayloadAction<any>) => {
      state.selectedDetailPokemon1 = action.payload;
    },
    selectDetailPokemon2: (state, action: PayloadAction<any>) => {
      state.selectedDetailPokemon2 = action.payload;
    },
    clearSelectedComparePokemon: state => {
      state.selectedPokemon1 = null;
      state.selectedPokemon2 = null;
    },
  },
});

export const {
  setPokemonList,
  detailPokemon,
  clearSelectedPokemon,
  selectPokemon1,
  selectDetailPokemon1,
  selectPokemon2,
  selectDetailPokemon2,
  clearSelectedComparePokemon,
} = pokemonSlice.actions;

export const fetchPokemonList =
  (limit: number, offset: number) => async (dispatch: AppDispatch) => {
    try {
      const data = await getPokemonList(limit, offset);
      dispatch(setPokemonList(data));
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
  };

export const fetchPokemonDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const data = await getPokemonDetails(id);

      // Make sure 'selectPokemon' receives the correct payload structure
      dispatch(detailPokemon(data));
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

export const fetchPokemonDetails1 =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const data = await getPokemonDetails(id);

      // Make sure 'selectPokemon' receives the correct payload structure
      dispatch(selectDetailPokemon1(data));
    } catch (error) {
      console.error(
        'Error fetching Pokemon details for first Pokemon :',
        error,
      );
    }
  };

export const fetchPokemonDetails2 =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const data = await getPokemonDetails(id);

      // Make sure 'selectPokemon' receives the correct payload structure
      dispatch(selectDetailPokemon2(data));
    } catch (error) {
      console.error(
        'Error fetching Pokemon details for second Pokemon :',
        error,
      );
    }
  };

export default pokemonSlice.reducer;
