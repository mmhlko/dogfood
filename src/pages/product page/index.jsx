import { useCallback, useContext, useEffect, useState } from "react";
import { CardList } from "../../components/card-list"
import Product from "../../components/product";
import { Sort } from "../../components/sort"
import { Spiner } from "../../components/spiner";
import api from "../../utils/api";
import { isLiked } from "../../utils/products";

import s from './styles.module.css';
import { useParams } from "react-router-dom";
import { NotFound } from "../../components/not found";
import { CardsContext } from "../../contexts/cards-context";
import { useApi } from "../../hooks";
import { UserContext } from "../../contexts/current-user-context";
import { useDispatch, useSelector } from "react-redux";
import { changeLikeState, fetchProducItem } from "../../storage/product-item/product-item-slice";
import { fetchChangeLikeProduct } from "../../storage/products/products-slice";

export const ProductPage = () => {
    const { productId } = useParams(); //Хук для создания динамической ссылки на товар(хранит переменные из ссылки в Route path /:variable/)
    
    //const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]);       
    
    //Заменили useApi на Redux
    const dispatch = useDispatch();
    const {data: product, loading: isLoading, error: errorState} = useSelector(state => state.productItem)

    //Удаляем все стейты, т.к. мы используем свой кастомный хук useApi, в котором уже все эти данные присутсвуют
    //const {data: product, loading: isLoading, error: errorState, setData: setProduct} = useApi(handleGetProduct)
    //Получаем данные из хука вместо стейтов, которые ниже
    
    //const [product, setProduct] = useState(null); //стейт товара
    //const [currentUser, setCurrentUser] = useState(null);
    //const [isLoading, setIsLoading] = useState(false) //стейт ожидания запроса
    //const [errorState, setErrorState] = useState(null) //стейт для ошибки при возвращении ошибки от сервера при запросе карточки

    //redux replace yconst { handleLike } = useContext(CardsContext);
    
    function handleProductLike(product) { 

        //при нажатии лайка внутри страницы продукта, вызывается глобальная 
        //функция постановки лайка из App, которая возвращает конкретную карточку и обновляет стейт
        dispatch(fetchChangeLikeProduct(product)).then((updatedCard) => { //заменили handleLike(убрали из контекста) на dispatch(fetchChangeLikeProduct(product))
            if (updatedCard?.payload?.product) {
                dispatch(changeLikeState(updatedCard.payload.product))
            }
            
            //setProduct(updatedCard.payload.product) //карточка теперь лежит в сторе, поэтому берем из поля payload
        })
      }

/*     useEffect(() => {
        //setIsLoading(true)
        api.getProductInfo(productId)
        .then(([productData, userData]) => {
            setCurrentUser(userData)
            //setProduct(productData)
        })
        .catch((err) => {
            //setErrorState(err)
            console.log('Ошибка на стороне сервера');
        })
        .finally(() => {
            //setIsLoading(false)
        })
    }, []) */

    useEffect(()=> {
        dispatch(fetchProducItem(productId))
    }, [dispatch, productId])

    return (
        <>
            {isLoading
            ? <Spiner /> 
            : !errorState && <Product onProductLike={handleProductLike} />}

            {!isLoading && errorState && <NotFound title='товар не найден' />}
        </>
    )
}