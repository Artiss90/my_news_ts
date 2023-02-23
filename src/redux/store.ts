import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import { authReducer } from 'redux/auth';
import  newsReducer from 'redux/news/newsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated'],
};

const store = configureStore({
  reducer: {
    // auth: persistReducer(authPersistConfig, authReducer),
    news: newsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: true,
});

const persiststore = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persiststore };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;