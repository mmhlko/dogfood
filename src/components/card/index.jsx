
import './styles.css';
import classNames from 'classnames';
import { calcDiscountPrice, isLiked } from '../../utils/products';
import { ReactComponent as LikeIcon } from "../../img/like.svg";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CardsContext } from '../../contexts/cards-context';
//import { UserContext } from '../../contexts/current-user-context';
import ContentLoader from "react-content-loader"
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeLikeProduct } from '../../storage/products/products-slice';

export function Card({ name, price, discount, weight, description, pictures, tags, likes, _id, ...props }) {
  //const { currentUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.data)
  const isLoading = useSelector(state => state.products.loading)
  //const { isLoading } = useContext(CardsContext);
  const discountPrice = calcDiscountPrice(price, discount);
  const like = currentUser && isLiked(likes, currentUser._id);

  

  //вытащили из App
  function handleProductLike(product) {
    return dispatch(fetchChangeLikeProduct(product))  
  } 


  function handleClickButtonLike() { //ожидание нажатия кнопки лайка
    handleProductLike({ likes, _id }) //в функцию попадет объект product, а мы его сразу деструктурировали на два интересующих свойства
  }

  return (
    <>
      {isLoading
        ? <ContentLoader
          speed={2}
          width={186}
          height={385}
          viewBox="0 0 186 385"
          backgroundColor="#d4cece"
          foregroundColor="#dbdbdb"
        >
          <path d="M 0 0 h 185.6 v 187 H 0 z M 0 203 h 186 v 14 H 0 z M 0 233 h 186 v 56 H 0 z M 0 305 h 186 v 24 H 0 z" />
          <rect x="0" y="345" rx="20" ry="20" width="121" height="40" />
        </ContentLoader>
        : <article className='card'>
          <div className="card__sticker card__sticker_type_top-left">
            {discount !== 0 && <span className="card__discount">{`- ${discount}%`}</span>}
            {tags && tags.map(tagName =>
              <span key={tagName} className={classNames('tag', { [`tag_type_${tagName}`]: tagName })}>
                {tagName}
              </span>
            )}
          </div>
          <div className="card__sticker card__sticker_type_top-right">
            <button onClick={handleClickButtonLike} className={classNames('card__favorite', { 'card__favorite_is-active': like })}>
              <LikeIcon className='card__favorite-icon' />
              {/*  <img src={likeIcon} alt="" className='card__favorite-icon'/> */}
            </button>
          </div>

          <Link to={`/product/${_id}`} className="card__link">
            <img src={pictures} alt={name} className="card__image" />
            <div className="card__desc">
              <span className={discount !== 0 ? "card__old-price" : "card__price"}>₽&nbsp;{price}</span>
              {discount !== 0 && <span className="card__price card__price_type_discount">₽&nbsp;{discountPrice}</span>}
              <span className="card__weight">{weight}</span>
              <h3 className="card__name">{name}</h3>
            </div>
          </Link>
          <a href="#" className="card__cart btn btn_type_primary">В корзину</a>

        </article>
      }
    </>


  );
}


