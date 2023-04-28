import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
    data: [],
    total: 0,
    loading: true,
    errror: null
}

export const sliceName = 'products'

export const fetchProducts = createAsyncThunk( 
    //асинхронный action, принимает имя асинх.экшена, а вторым - асинх. функция payload-creator которая генерирует payload
    //ее задача вернуть payload, который будет использоваться в экшене редьюсера
    `${sliceName}/fetchProducts`,
    async function fgsdf(_, {getState, fulfillWithValue,rejectWithValue}) {
        try {
            const data = await api.getProductList();
            return fulfillWithValue(data) //action.payload = {products: [], total: 0}
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const productsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => { //{type: 'products/fetchProducts/pending', payload (какие-то данные {...}}
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload.products; //то что приходит по запросу продуктов, массив с товарами
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export default productsSlice.reducer;


/* fetchProducts = {
    pending: () => {type: 'products/fetchProducts/pending', payload},
    fulfilled: () => {type: 'products/fetchProducts/fulfilled', payload},
    rejected: () => {type: 'products/fetchProducts/rejected', payload}

} */