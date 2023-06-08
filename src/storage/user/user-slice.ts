import {createSlice, createAsyncThunk, SerializedError} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setLocalData } from '../../utils/local-storage';
import { createAppAsyncThunk } from '../hook';
import { TAuthResponseDto, TUserResponseDto, UserAuthBodyDto, UserBodyDto, UserRegisterBodyDto } from '../../utils/api';
// import api from '../../utils/api'; payloadCreator => extra: api

export type TUserState  = {
    isAuthChecked: boolean,
    data: TUserResponseDto | null,

    fetchRegisterUserRequest: boolean,
    fetchRegisterUserError: SerializedError | null | unknown,

    fetchLoginUserRequest: boolean,
    fetchLoginUserError: SerializedError | null | unknown,

    fetchCheckTokenRequest: boolean,
    fetchCheckTokenError: SerializedError | null | unknown,

    fetchEditUserInfoRequest: boolean,
    fetchEditUserInfoError: SerializedError | null | unknown,

}

const initialState: TUserState = {
    isAuthChecked: false,
    data: null,

    fetchRegisterUserRequest: false,
    fetchRegisterUserError: null,

    fetchLoginUserRequest: false,
    fetchLoginUserError: null,

    fetchCheckTokenRequest: false,
    fetchCheckTokenError: null,

    fetchEditUserInfoRequest: false,
    fetchEditUserInfoError: null,

}

export const sliceName = 'user'

/* Пояснение:
    fetchProducts = {
    pending: () => {type: 'products/fetchProducts/pending', payload},
    fulfilled: () => {type: 'products/fetchProducts/fulfilled', payload},
    rejected: () => {type: 'products/fetchProducts/rejected', payload}

} */

export const fetchRegisterUser = createAppAsyncThunk<TUserResponseDto, UserRegisterBodyDto>(  //вместо createAsyncThunk
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

export const fetchLoginUser = createAppAsyncThunk<TUserResponseDto, UserAuthBodyDto>( //вместо createAsyncThunk
    /* arg1 */ `${sliceName}/fetchLoginUser`,
    /* arg2 */ async function payloadCreator(dataUser, {fulfillWithValue,rejectWithValue, extra: api}) {
        try {
            const data = await api.authorize(dataUser);
                        
            if (data.token) {                
               setLocalData('token', data.token)
               return fulfillWithValue(data.data) //action.payload = {products: [], total: 0}

            } else {
                return rejectWithValue(data)
            }
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

export const fetchCheckToken = createAppAsyncThunk<TUserResponseDto, string>( 
//вместо createAsyncThunk, а в качестве дженерика мы указываем то, что должны получить самим запросом, т.е. тип TUserResponseDto
//вторым аргументом является тип аргумента ф-и payloadCreator - token
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

export const fetchEditUserInfo = createAppAsyncThunk<TUserResponseDto, UserBodyDto>(
    `${sliceName}/fetchEditUserInfo`,
    async function payloadCreator(dataUser, { fulfillWithValue, rejectWithValue, extra: api}) {
        try {
            const data = await api.setUserInfo(dataUser);
            if(data.name) {
                return fulfillWithValue(data)
            } else {
                return rejectWithValue(data)
            }
             
        } catch (error) {
            return rejectWithValue(error)
        }
        
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

            //fetchRegisterUser

            .addCase(fetchRegisterUser.pending, (state, action) => { //{type: 'user/fetchUser/pending', payload (какие-то данные {...}}
                state.fetchRegisterUserRequest = true;
                state.fetchRegisterUserError = null;
            })
            .addCase(fetchRegisterUser.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchRegisterUserRequest = false;
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
                state.fetchLoginUserRequest = false;
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

            //fetchEditUserInfo
            .addCase(fetchEditUserInfo.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchCheckTokenRequest = false;
            })
            .addCase(fetchEditUserInfo.rejected, (state, action) => {
                state.fetchCheckTokenError = action.payload;
                state.fetchCheckTokenRequest = false;
            })
    }
})


export const { authCheck, logout } = userSlice.actions; //экспорт в тот же файл, в finally {dispatch(authCheck())}
export default userSlice.reducer;



