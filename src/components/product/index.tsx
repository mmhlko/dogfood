import s from './styles.module.css';
import classNames from 'classnames';
import { Button } from '../button';
import { calcDiscountPrice, checkProductInCart, isLiked } from '../../utils/products';
import { ReactComponent as LikeIcon } from "../../img/like.svg";
import truck from "../../img/truck.svg";
import quality from "../../img/quality.svg";
import { Link, useNavigate } from 'react-router-dom';
//import { UserContext } from '../../contexts/current-user-context';
import { useState } from 'react';
import { ContentHeader } from '../content-header';
import Rating from '../rating';
import FormReview from '../form-review';
import { useSelector, useDispatch} from 'react-redux';
import Review from '../review';
import { addProductCart, changeProductQuantityCart, decrementQuantityCart, incrementQuantityCart } from '../../storage/cart/cart-slice';
import { ProductPrice } from '../product-price';
import ButtonCount from '../button-count';
import { useAppSelector } from '../../storage/hook';
import { TProduct } from '../../types';

interface IProductProps {
    onProductLike: (data: {likes:string[], _id:string}) => void
}


function Product({onProductLike}:IProductProps) {
    //const {currentUser} = useContext(UserContext)
    const {name, description, pictures, price, wight, discount, likes = [], _id, reviews} = useAppSelector(state => state.productItem.data) as TProduct //|| {} //ts ругается что может быть null поэтому ставим ИЛИ {} (т.е. null)
    const addDataCart = {_id, name, pictures, discount, price, wight}
    const currentUser = useAppSelector(state => state.user.data)
    const [currentRating, setCurrentRating] = useState<number>(5)
    const navigate = useNavigate(); //хук для навигации по сайту
    const like = currentUser && isLiked(likes, currentUser._id)
    const dispatch = useDispatch();

    //проверка наличия товара в корзине
    const cartProducts = useAppSelector(state => state.cart.data);  //корзина
    const productInCartInfo = checkProductInCart(cartProducts, _id as string) ;  //проверяемый товар + проверка на сущ. _id
    
    function handleLikeClick() {
        onProductLike({likes, _id: _id})
    }
    function createMarkupDescription() {
        return { __html: description };
    }
    function handleCartClick() {
        dispatch(addProductCart(addDataCart))

    }

      
    
    return ( 
        <>
            <ContentHeader  textButton={'назад'} title={name}>
                <p className={s.articul}>Артикул: <b>664646</b></p>
                <Rating currentRating={currentRating} setCurrentRating={setCurrentRating}/>
            </ContentHeader>

            <div className={s.product}>
                <div className={s.imgWrapper}>
                    <img src={pictures} alt={name} />
                </div>
                <div className={s.desc}>
                    <ProductPrice price={price} discount={discount} type='small'/> 
                    <div className={s.btnWrap}>
                        <div className={s.left}>
                            <ButtonCount 
                                amount={productInCartInfo.quantity}
                                handleIncrement={() => { dispatch(incrementQuantityCart(addDataCart)) }}
                                handleDecrement={() => { dispatch(decrementQuantityCart(addDataCart)) }}
                                handleCountChange={(newQuantity) => { dispatch(changeProductQuantityCart({ ...addDataCart, quantity: newQuantity })) }}
                            />
                        </div>
                        <Button action={handleCartClick} href='#' variant='primary'>{!productInCartInfo.quantity && productInCartInfo.quantity === 0 ? 'В корзину' : 'Добавлено'}</Button>
                    </div>
                    <button className={classNames(s.favorite, {[s.favoriteActive]: like})} onClick={handleLikeClick}>
                        <LikeIcon />
                        {like? 'В избранном' : 'В избранное'}
                    </button>
                    <div className={s.delivery}>
                        <img src={truck} alt="truck" />
                        <div className={s.right}>
                            <h3 className={s.name}>Доставка по всему Миру!</h3>
                            <p className={s.text}>
                                Доставка курьером —{" "}
                                <span className={s.bold}> от 399 ₽</span>
                            </p>
                            <p className={s.text}>
                                Доставка в пункт выдачи —{" "}
                                <span className={s.bold}> от 199 ₽</span>
                            </p>
                        </div>
                    </div>
                    <div className={s.delivery}>
                        <img src={quality} alt="quality" />
                        <div className={s.right}>
                            <h3 className={s.name}>Гарантия качества</h3>
                            <p className={s.text}>
                                Если Вам не понравилось качество нашей продукции, мы вернем
                                деньги, либо сделаем все возможное, чтобы удовлетворить ваши
                                нужды.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.box}>
                <h2 className={s.title}>Описание</h2>
                <p className={s.subtitle} dangerouslySetInnerHTML={createMarkupDescription()}></p>
                <h2 className={s.title}>Характеристики</h2>
                <div className={s.grid}>
                    <div className={s.naming}>Вес</div>
                    <div className={s.description}>1 шт 120-200 грамм</div>
                    <div className={s.naming}>Цена</div>
                    <div className={s.description}>490 ₽ за 100 грамм</div>
                    <div className={s.naming}>Польза</div>
                    <div className={s.description}>
                        <p>
                            Большое содержание аминокислот и микроэлементов оказывает
                            положительное воздействие на общий обмен веществ собаки.
                        </p>
                        <p>Способствуют укреплению десен и жевательных мышц.</p>
                        <p>
                            Развивают зубочелюстной аппарат, отвлекают собаку во время смены
                            зубов.
                        </p>
                        <p>
                            Имеет цельную волокнистую структуру, при разжевывание получается
                            эффект зубной щетки, лучше всего очищает клыки собак.
                        </p>
                        <p>Следует учесть высокую калорийность продукта.</p>
                    </div>
                </div>
            </div>
            
            {reviews?.length !==0 && reviews?.map((reviewData, index) => <Review key={index} {...reviewData}/>)}
           
            <FormReview title={`Отзыв о товаре ${name}`} productId={_id}/>
        </>
     );
}

export default Product;