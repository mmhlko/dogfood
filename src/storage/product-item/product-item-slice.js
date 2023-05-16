import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
    data: [],
    //favoriteProducts: [], //добавляем новое поле в стейт, т.к. в запросе currentUser уже придет (см. const { user } = await getState())
    //total: 0,
    loading: false,
    error: null
}

export const sliceName = 'product-item'

export const fetchProducItem = createAsyncThunk( 
    //асинхронный action, принимает имя асинх.экшена, а вторым - асинх. функция payload-creator которая генерирует payload
    //ее задача вернуть payload, который будет использоваться в экшене редьюсера
   /* arg1 */ `${sliceName}/fetchProducItem`,
   /* arg2 */ async function payloadCreator(productId, {fulfillWithValue,rejectWithValue, getState, extra: api}) {
        try {
            const data = await api.getProductById(productId);
            return fulfillWithValue(data) //action.payload = {products: [], total: 0}
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

export const fetchCreateReview = createAsyncThunk( 
    //асинхронный action, принимает имя асинх.экшена, а вторым - асинх. функция payload-creator которая генерирует payload
    //ее задача вернуть payload, который будет использоваться в экшене редьюсера
   /* arg1 */ `${sliceName}/fetchCreateReview`,
   /* arg2 */ async function payloadCreator({productId, data: body}, {fulfillWithValue,rejectWithValue, getState, extra: api}) {
        try {
            const data = await api.createReviewProduct(productId, body);
            return fulfillWithValue(data) //action.payload = {products: [], total: 0}
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

const productItemSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        changeLikeState: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder //как в switch-case:

        //Product-item
            .addCase(fetchProducItem.pending, (state, action) => { //{type: 'products/fetchProducts/pending', payload (какие-то данные {...}}
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducItem.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload;
                state.loading = false
            })
            .addCase(fetchProducItem.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
        //Create review
            .addCase(fetchCreateReview.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload;
            })
            .addCase(fetchCreateReview.rejected, (state, action) => {
                state.error = action.payload;
                
            })
            
    }
})
export const { changeLikeState } = productItemSlice.actions //экспортируем отдельно
export default productItemSlice.reducer;



