import {createSlice, createAsyncThunk, SerializedError, isAction} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setLocalData } from '../../utils/local-storage';
import { createAppAsyncThunk } from '../hook';
import { TAuthResponseDto, TUserResponseDto, UserAuthBodyDto, UserBodyDto, UserRegisterBodyDto } from '../../utils/api';
import { getActionName, isActionPending, isActionRejected } from '../../utils/redux';
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
            .addCase(fetchRegisterUser.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchRegisterUserRequest = false;
            })

            //fetchLoginUser
            .addCase(fetchLoginUser.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchLoginUserRequest = false;
            })

            //fetchCheckToken
            .addCase(fetchCheckToken.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchCheckTokenRequest = false;
            })

            //fetchEditUserInfo
            .addCase(fetchEditUserInfo.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchCheckTokenRequest = false;
            })


            //add matcher шаблон для редьюсеров, принимает на вход 1. ф-я => boolean, 2. сама функция меняющая стор
            .addMatcher(isActionPending, (state, action) => {
                //state[`${getActionName(action.type)}Request`]: true //так было бы без TS, TS ругается, тк в виде строки может придти что угодно, и может такого поля не быть
                //обход TS
                state = {...state, [`${getActionName(action.type)}Request`]: true}
                state = {...state, [`${getActionName(action.type)}Error`]: null} //так было бы без TS, TS ругается, тк в виде строки может придти что угодно, и может такого поля не быть

            })
            .addMatcher(isActionRejected, (state, action) => {
                //state[`${getActionName(action.type)}Request`]: true //так было бы без TS, TS ругается, тк в виде строки может придти что угодно, и может такого поля не быть
                //обход TS
                state = {...state, [`${getActionName(action.type)}Request`]: false}
                state = {...state, [`${getActionName(action.type)}Error`]: action.payload } //так было бы без TS, TS ругается, тк в виде строки может придти что угодно, и может такого поля не быть

            })

    }
})


export const { authCheck, logout } = userSlice.actions; //экспорт в тот же файл, в finally {dispatch(authCheck())}
export default userSlice.reducer;



