import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setLocalData } from '../../utils/local-storage';
// import api from '../../utils/api'; payloadCreator => extra: api


const initialState = {
    isAuthChecked: false,
    data: null,

    registerUserRequest: false,
    registerUserError: null,

    loginUserRequest: false,
    loginUserError: null,

    chekTokenUserRequest: false,
    chekTokenUserError: null,

    fetchUserRequest: false,
    fetchUserError: null,

}

export const sliceName = 'user'

/* Пояснение:
    fetchProducts = {
    pending: () => {type: 'products/fetchProducts/pending', payload},
    fulfilled: () => {type: 'products/fetchProducts/fulfilled', payload},
    rejected: () => {type: 'products/fetchProducts/rejected', payload}

} */

export const fetchUser = createAsyncThunk( 
    //асинхронный action, принимает имя асинх.экшена, а вторым - асинх. функция payload-creator которая генерирует payload
    //ее задача вернуть payload, который будет использоваться в экшене редьюсера
   /* arg1 */ `${sliceName}/fetchUser`,
   /* arg2 */ async function payloadCreator(_, {fulfillWithValue,rejectWithValue, extra: api}) {
        try {
            const data = await api.getUserInfo();
            return fulfillWithValue(data) //action.payload = {products: [], total: 0}
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

export const fetchRegisterUser = createAsyncThunk( 
    /* arg1 */ `${sliceName}/fetchRegisterUser`,
    /* arg2 */ async function payloadCreator(dataUser, {fulfillWithValue,rejectWithValue, extra: api}) {
        try {
            const data = await api.register(dataUser);
            return fulfillWithValue(data) //action.payload = {products: [], total: 0}
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

export const fetchLoginUser = createAsyncThunk( 
    /* arg1 */ `${sliceName}/fetchLoginUser`,
    /* arg2 */ async function payloadCreator(dataUser, {fulfillWithValue,rejectWithValue, extra: api}) {
        try {
            const data = await api.authorize(dataUser);
            if (data.token) {                
               setLocalData('token', data.token)
            } else {
                return rejectWithValue(data)
            }
            return fulfillWithValue(data) //action.payload = {products: [], total: 0}
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

export const fetchCheckToken = createAsyncThunk( 
    /* arg1 */ `${sliceName}/fetchCheckToken`,
    /* arg2 */ async function payloadCreator(token, {fulfillWithValue,rejectWithValue, extra: api, dispatch}) {
        try {
            const data = await api.checkToken(token);            
            return fulfillWithValue(data) //action.payload = {products: [], total: 0}
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
        finally {dispatch(authCheck())}
    }
)

const userSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        authCheck: (state) => {
            state.isAuthChecked = true;
        },
        logout: (state) => {
            state.data = null;
            setLocalData('token', null)
        }
    },
    extraReducers: (builder) => {
        builder //как в switch-case:

            //fetchUser

            .addCase(fetchUser.pending, (state, action) => { //{type: 'user/fetchUser/pending', payload (какие-то данные {...}}
                state.fetchUserRequest = true;
                state.fetchUserError = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchUserRequest = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.fetchUserError = action.payload;
                state.fetchUserRequest = false;
            })

            //fetchRegisterUser

            .addCase(fetchRegisterUser.pending, (state, action) => { //{type: 'user/fetchUser/pending', payload (какие-то данные {...}}
                state.fetchRegisterUserRequest = true;
                state.fetchRegisterUserError = null;
            })
            .addCase(fetchRegisterUser.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchUserRequest = false;
            })
            .addCase(fetchRegisterUser.rejected, (state, action) => {
                state.fetchRegisterUserError = action.payload;
                state.fetchRegisterUserRequest = false;
            })

            //fetchLoginUser

            .addCase(fetchLoginUser.pending, (state, action) => { //{type: 'user/fetchUser/pending', payload (какие-то данные {...}}
                state.fetchLoginUserRequest = true;
                state.fetchLoginUserError = null;
            })
            .addCase(fetchLoginUser.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchUserRequest = false;
            })
            .addCase(fetchLoginUser.rejected, (state, action) => {
                state.fetchLoginUserError = action.payload;
                state.fetchLoginUserRequest = false;
            })

            //fetchCheckToken

            .addCase(fetchCheckToken.pending, (state, action) => { //{type: 'user/fetchUser/pending', payload (какие-то данные {...}}
                state.fetchCheckTokenRequest = true;
                state.fetchCheckTokenError = null;
            })
            .addCase(fetchCheckToken.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchCheckTokenRequest = false;
            })
            .addCase(fetchCheckToken.rejected, (state, action) => {
                state.fetchCheckTokenError = action.payload;
                state.fetchCheckTokenRequest = false;
            })
    }
})


export const { authCheck, logout } = userSlice.actions; //экспорт в тот же файл, в finally {dispatch(authCheck())}
export default userSlice.reducer;



