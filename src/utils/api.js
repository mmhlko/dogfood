class Api {
    #baseUrl;
    #headers;
    

    constructor({baseUrl, headers}) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponce(res) { //метод обрабатывает запросы с сервера при получении ответа с него
       return res.ok ? res.json() : res.json().then(err => Promise.reject(err)) 
    }

    getAllInfo() { //нужен чтобы запрос пользователя был вместе с продуктам, чтоб рендеринг был после определения пользователя
        return Promise.all([this.getUserInfo(), this.getProductList()])
    }

    getProductList() { //получаем список карточек с сервера
        return fetch(`${this.#baseUrl}/products`, {
            headers: this.#headers
        }
        )
            .then(this.#onResponce)
    }

    getUserInfo() { //запрос пользователя
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponce)
    }

    search(searchQuery) { //запрос пользователя
        return fetch(`${this.#baseUrl}/products/search?query=${searchQuery}`, {
            headers: this.#headers
        })
            .then(this.#onResponce)
    }

    setUserInfo({name, about}) { //изменение пользователя

        return fetch(`${this.#baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({name, about})
        })
            .then(this.#onResponce)
    }

    changeLikeProductStatus(productID, isLiked) {
        return fetch(`${this.#baseUrl}/products/likes/${productID}`, {
            method: isLiked? 'DELETE' : 'PUT',
            headers: this.#headers
        })
        
            .then(this.#onResponce)
    }
}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI4ZWMiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ4LCJleHAiOjE3MTAzMzg0NDh9.Ij9HtsP55BsI2ukV4SgqqSWxsEjpcJz53Avty8LEgKE',
        
    }

})


export default api;

/* api.getProductList()
    .then(data => console.log('cards', data))
    .catch(err => console.log(err))

api.getUserInfo()
    .then(data => console.log('user', data))
    .catch(err => console.log(err)) */
    