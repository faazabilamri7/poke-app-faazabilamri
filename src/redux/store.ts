import {configureStore} from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
