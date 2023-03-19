
import './styles.css';
import classNames from 'classnames';
import {ReactComponent as LikeIcon} from '../../img/like.svg'
import { isLiked } from '../../utils/products';


export function Card({name, price, discount, weight, description, pictures, tags, likes, _id, currentUser, onProductLike,  ...props}) {
  
  const discountPrice = Math.round(price * (1 - discount/100) )

  const like = currentUser && isLiked(likes, currentUser._id)

  

  function handleClickButtonLike() { //ожидание нажатия кнопки лайка
    onProductLike({likes, _id}) //в функцию попадет объект product, а мы его сразу деструктурировали на два интересующих свойства
  }
  
  return (
    <article className='card'>
      <div className="card__sticker card__sticker_type_top-left">
        {discount !== 0 && <span className="card__discount">{`- ${discount}%`}</span>}
        {tags && tags.map(tagName => 
          <span key={tagName} className={classNames('tag', {[`tag_type_${tagName}`]: tagName})}>
            {tagName}
          </span>
        )}
      </div>
      <div className="card__sticker card__sticker_type_top-right">
        <button  onClick={handleClickButtonLike} className={classNames('card__favorite', {'card__favorite_is-active': like})}>
          <LikeIcon />
         {/*  <img src={likeIcon} alt="" className='card__favorite-icon'/> */}
        </button>
      </div>

      <a href="#" className="card__link">
        <img src={pictures} alt={name} className="card__image" />
        <div className="card__desc">
          <span className={discount !== 0? "card__all-price" : "card__price" }>{price}&nbsp;Р</span>
          {discount !== 0 && <span className="card__price card__price_type_discount">{discountPrice}&nbsp;Р</span>}
          <span className="card__weight">{weight}</span>
          <h3 className="card__name">{name}</h3>
        </div>    
      </a>
      <a href="#" className="card__cart btn btn_type_primary">В корзину</a>

    </article>
  );
}


