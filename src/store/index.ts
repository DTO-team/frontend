import { combineReducers } from 'redux';
import { counterReducer } from 'slices';
import { pokemonApi } from 'services';

export const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
