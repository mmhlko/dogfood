import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productsReducer from './products/products-slice';
import userReducer from './user/user-slice';
import productItemReducer from './product-item/product-item-slice';
import api from '../utils/api';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        productItem: productItemReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: {
                extraArgument: api
            }
        })
    }
})

export default store;