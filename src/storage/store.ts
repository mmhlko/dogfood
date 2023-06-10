import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productsReducer from './products/products-slice';
import userReducer from './user/user-slice';
import productItemReducer from './product-item/product-item-slice';
import api from '../utils/api';
import cartReducer from './cart/cart-slice';

//redux persist работа с локальным хранилищем
import storage from 'redux-persist/lib/storage';
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

const persistConfig = {
    key: 'cart',
    storage: storage 
}

const persistedCartReducer = persistReducer(persistConfig, cartReducer); //добавляем свой редьюсер в персист для обработки и работы с библиотекой persist


export const store = configureStore({
    reducer: {
        products: productsReducer,
        productItem: productItemReducer,
        user: userReducer,
        cart: persistedCartReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: {
                extraArgument: api
            },
            serializableCheck: { //для игнора экшенов из персиста //из инструкции по тулкиту https://redux-toolkit.js.org/usage/usage-guide
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
    }
})




export const persistor = persistStore(store);
export default store;