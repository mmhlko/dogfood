
import './styles.css';
import likeIcon from '../../img/like.svg'

export function Card({name, price, discount, weight, description, picture, ...props}) {
  
  const discountPrice = Math.round(price * (1 - discount/100) )
  
  return (
    <article className='card'>
      <div className="card__sticker card__sticker_type_top-left">
        {discount !== 0 && <span className="card__discount">{`- ${discount}%`}</span>}
      </div>
      <div className="card__sticker card__sticker_type_top-right">
        <button className='card__favorite'>
          <img src={likeIcon} alt="" className='card__favorite-icon'/>
        </button>
      </div>

      <a href="#" className="card__link">
        <img src={picture} alt={name} className="card__image" />
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


