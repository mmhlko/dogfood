import {createSlice, createAsyncThunk, SerializedError} from '@reduxjs/toolkit';
//import api from '../../utils/api'; payloadCreator => extra: api
import { isLiked } from '../../utils/products';
import { TABS_ID } from '../../utils/constants';
import { TProductResponseDto, TProductsResponseDto, TUserResponseDto } from '../../utils/api';
import { TProduct, TUser } from '../../types';
import { createAppAsyncThunk } from '../hook';
import { TUserState } from '../user/user-slice';

type TProductsState = {
    data: TProductResponseDto[],
    currentSort: string,
    defaultSort: any,
    favoriteProducts: TProductResponseDto[],
    total: number,
    loading: boolean,
    error: SerializedError | null | unknown,
}

const initialState: TProductsState = {
    data: [],
    currentSort: '',
    defaultSort: null,
    favoriteProducts: [], //добавляем новое поле в стейт, т.к. в запросе currentUser уже придет (см. const { user } = await getState())
    total: 0,
    loading: false,
    error: null
}

export const sliceName = 'products'

export const fetchProducts = createAppAsyncThunk<TProductsResponseDto & { currentUser: TUserResponseDto | null }, void>( 
    //асинхронный action, принимает имя асинх.экшена, а вторым - асинх. функция payload-creator которая генерирует payload
    //ее задача вернуть payload, который будет использоваться в экшене редьюсера
   /* arg1 */ `${sliceName}/fetchProducts`,
   /* arg2 */ async function payloadCreator(_, {fulfillWithValue,rejectWithValue, getState, extra: api}) {
        try {
            const { user } = await getState();//запрос другого среза через getState
            const data = await api.getProductList();            
            return fulfillWithValue({...data, currentUser: user.data}) //action.payload = ответ от сервера {products: [], total: 0} + currentUser: user.data
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

export const fetchChangeLikeProduct = createAppAsyncThunk<{ product: TProductResponseDto, liked: boolean }, { likes: string[], _id: string }>( 
    //асинхронный action, принимает имя асинх.экшена, а вторым - асинх. функция payload-creator которая генерирует payload
    //ее задача вернуть payload, который будет использоваться в экшене редьюсера
   /* arg1 */ `${sliceName}/fetchChangeLikeProduct`,
   /* arg2 */ async function payloadCreator(product, {fulfillWithValue,rejectWithValue, getState, extra: api}) {
        try {
            const { user } = await getState();//запрос другого среза через getState
            const liked = user.data ? isLiked(product.likes, user.data._id) : false
            const data = await api.changeLikeProductStatus(product._id, liked); // data: {product, liked} 1 аргумент
            return fulfillWithValue({product: data, liked}) //action.payload = {products: [], total: 0}
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

const productsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        sortedProducts: (state, action) => {          
            
            switch (action.payload) {
                case (TABS_ID.CHEAP):
                    state.data = state.data.sort((a, b) => a.price - b.price);
                    state.currentSort = action.payload;                                     
                    break;
                case (TABS_ID.LOW):
                    state.data = state.data.sort((a, b) => b.price - a.price);
                    state.currentSort = action.payload;                  
                    break;
                case (TABS_ID.DISCOUNT):
                    state.data = state.data.sort((a, b) => b.discount - a.discount);                  
                    state.currentSort = action.payload;
                    break;   
                case (TABS_ID.DEFAULT):
                    state.data = state.defaultSort;
                    state.currentSort = action.payload;
                    break;        
                default:
                    state.data = state.defaultSort;
                    state.currentSort = TABS_ID.DEFAULT;
                    break;
              }
        }
    },
    extraReducers: (builder) => {
        builder //как в switch-case:
        //Products
            .addCase(fetchProducts.pending, (state, action) => { //{type: 'products/fetchProducts/pending', payload (какие-то данные {...}}
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                const {products, total, currentUser} = action.payload; //(см. fetchProducts) деструктурируем поля из  в action.payload, чтоб постоянно не писать action.payload.currentUser._id
                state.data = products; //то что приходит по запросу продуктов, массив с товарами                
                state.defaultSort = state.data.slice();                
                state.total = total;
                if (currentUser) state.favoriteProducts = products.filter(item => isLiked(item.likes, currentUser._id))
                
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            //Change Like
            .addCase(fetchChangeLikeProduct.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                const {product, liked} = action.payload; //деструктурируем поля в action.payload, чтоб постоянно не писать action.payload.currentUser._id
                state.data = state.data.map(cardState => { //карточка в стейте cards
                    return cardState._id === product._id? product : cardState
                   })
                   //setCards(newProducts)
         
                   if (!liked) { //если лайка не было, то при нажатии на лайк карточка добвится в массив избранных карточек
                    state.favoriteProducts.push(product) //можно пушить напрямую, а в useState нельзя, поэтому ниже добавляется через спред
                    //setFavorites(prevState => [...prevState, updatedCard])
                   } else { //если лайк стоял, лайк убирается и возвращается отфильтрованный массив в стейт избранных карточек
                    state.favoriteProducts = state.favoriteProducts.filter(card => card._id !== product._id)
                     //setFavorites(prevState => prevState.filter(card => card._id !== updatedCard._id))
                   }
            })
            .addCase(fetchChangeLikeProduct.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})
export const { sortedProducts } = productsSlice.actions
export default productsSlice.reducer;



