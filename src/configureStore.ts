import { Middleware } from 'redux';
import { configureStore as configureStoreReduxToolkit, EnhancedStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { RootState, rootReducer } from './store/index';

export const middlewares: Middleware[] = [thunk];

export default function configureStore(initialState = {}): EnhancedStore<RootState, any> {
  // Apply logMiddleware for all environments except test (e.g: When running Unit or Gauge test)
  if (process.env.NODE_ENV !== 'test') {
    // middlewares.push(logMiddleware)
  }
  if (process.env.NODE_ENV !== 'development') {
    const store = configureStoreReduxToolkit({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: middlewares,
    });
    // @ts-ignore
    window.store = store;
    return store;
  } else {
    return configureStoreReduxToolkit({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: middlewares,
      devTools: true,
    });
  }
}
