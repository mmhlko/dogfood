import { TProduct, TReview, TUser } from "../types";
import { getLocalData } from "./local-storage";


type ApiConfig = {
    baseUrl: string;
    headers: any;
}

type ServerResponse<T> = {
    created_at?: Date,
    updated_at?: Date,
    __v?: number
} & T; //& T добавляет к типу данные из Т

export type TUserResponseDto = ServerResponse<TUser> //получаем тип юзера вместе с полями от сервера (created_at: Date, updated_at: Date, __v)
export type TProductResponseDto = ServerResponse<TProduct> //получаем тип продукта вместе с полями от сервера (created_at: Date, updated_at: Date, __v)
export type TReviewResponseDto = ServerResponse<TReview> //получаем тип отзыва вместе с полями от сервера (created_at: Date, updated_at: Date, __v)

export type TProductsResponseDto = {
    products: TProductResponseDto[];
    total: number;
}

export type TAuthResponseDto = {
    data: TUserResponseDto;
    token: string;
}


//типа данных при передаче данных пользователя
export  type UserBodyDto = {
    name: string,
    about: string,
    avatar?: string,
    email?:string
}
//типа данных при авторизации
export  type UserAuthBodyDto = {
    email: string,
    password: string,
}
//типа данных при регистрации
export  type UserRegisterBodyDto = {
    group: string,    
} & UserAuthBodyDto & Partial<UserAuthBodyDto> //необязательные поля из UserAuthBodyDto

//типа данных при отправке отзыва
export  type UserReviewBodyDto = {
    rating: number,
    text: string,
    city?: string
}

export class Api {
    #baseUrl;
    #headers;
    

    constructor({baseUrl, headers}:ApiConfig) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponce<T>(res: Response): Promise<T> { //метод обрабатывает запросы с сервера при получении ответа с него
       return res.ok ? res.json() : res.json().then(err => Promise.reject(err)) 
    }

    getProductList() { //получаем список карточек с сервера
        return fetch(`${this.#baseUrl}/products`, {
            headers: { ...this.#headers, authorization: `Bearer ${getLocalData('token')}` },        
        }
        )
            .then(this.#onResponce<TProductsResponseDto>)
    }

    getUserInfo() { //запрос пользователя
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: { ...this.#headers, authorization: `Bearer ${getLocalData('token')}` },        
        })
            .then(this.#onResponce<TUserResponseDto>)
    }

    search(searchQuery: string) { //запрос пользователя
        return fetch(`${this.#baseUrl}/products/search?query=${searchQuery}`, {
            headers: { ...this.#headers, authorization: `Bearer ${getLocalData('token')}` },        
        })
            .then(this.#onResponce<TProductResponseDto[]>)
    }

    setUserInfo({name, about}:UserBodyDto) { //изменение пользователя

        return fetch(`${this.#baseUrl}/users/me`, {
            method: 'PATCH',
            headers: { ...this.#headers, authorization: `Bearer ${getLocalData('token')}` },            
            body: JSON.stringify({name, about})
        })
            .then(this.#onResponce<TUserResponseDto>)
    }

    changeLikeProductStatus(productId: string, isLiked: boolean) {
        return fetch(`${this.#baseUrl}/products/likes/${productId}`, {
            method: isLiked? 'DELETE' : 'PUT',
            headers: { ...this.#headers, authorization: `Bearer ${getLocalData('token')}` },        
        })
        
            .then(this.#onResponce<TProductResponseDto>)
    }

    getProductById(productId: string) {
        return fetch(`${this.#baseUrl}/products/${productId}`, {
            headers: { ...this.#headers, authorization: `Bearer ${getLocalData('token')}` },        
        }
        )
            .then(this.#onResponce<TProductResponseDto>)
    }

    createReviewProduct(productId: string, reviewData: UserReviewBodyDto) { //изменение пользователя

        return fetch(`${this.#baseUrl}/products/review/${productId}`, {
            method: 'POST',
            headers: { ...this.#headers, authorization: `Bearer ${getLocalData('token')}` },            
            body: JSON.stringify(reviewData)
        })
            .then(this.#onResponce<TProductResponseDto>)
    }

    // Login

    register(bodyData:UserRegisterBodyDto) { //изменение пользователя

        return fetch(`${this.#baseUrl}/signup`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(bodyData)
        })
            .then(this.#onResponce<TUserResponseDto>)
    }

    authorize(bodyData:UserAuthBodyDto) { //изменение пользователя

        return fetch(`${this.#baseUrl}/signin`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(bodyData)
        })
            .then(this.#onResponce<TAuthResponseDto>)
    }

/*     passwordForgot() { //изменение пользователя

        return fetch(`${this.#baseUrl}/forgot-password`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify()
        })
            .then(this.#onResponce)
    } */

    passwordReset(token:string, password:string) { //изменение пользователя

        return fetch(`${this.#baseUrl}/forgot-password/${token}`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({password: password})
        })
            .then(this.#onResponce)
    }

    checkToken(token:string) { //изменение пользователя
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: {...this.#headers, authorization: `Bearer ${token}`}            
        })
            .then(this.#onResponce<TUserResponseDto>)
    }



}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru', //далее добавляется эндпоинт
    headers: {
        'content-type': 'application/json',
        //authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI4ZWMiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ4LCJleHAiOjE3MTAzMzg0NDh9.Ij9HtsP55BsI2ukV4SgqqSWxsEjpcJz53Avty8LEgKE',
        
    }

})


export default api;

/* api.getProductList()
    .then(data => console.log('cards', data))
    .catch(err => console.log(err))

api.getUserInfo()
    .then(data => console.log('user', data))
    .catch(err => console.log(err)) */
    