import { useDispatch } from 'react-redux';
import s from './styles.module.css'
import { Link } from 'react-router-dom';
import { ReactComponent as TrashIcon  } from './img/trash.svg'
import GiftLabel from '../gift-label/gift-label';

import { ProductPrice } from '../product-price';
import { changeProductQuantityCart, decrementQuantityCart, incrementQuantityCart, removeProductCart } from '../../storage/cart/cart-slice';
import ButtonCount from '../button-count';

function CartItem({ name, price, discount, weight, pictures, _id, quantity, isGift, ...props }) {

    const dispatch = useDispatch();
    const addDataProduct = { _id, name, pictures, discount, price, weight, quantity };

    return ( 
        <>
        <div className={s.cartItem}>
            <div className={s.cartDesc}>
                <img src={pictures} alt={name} className={s.cartImage}/>
                <Link to={`/product/${_id}`} className={s.link}><h2 className={s.cartTitle}>{name}</h2></Link>
                <p className={s.cartWeight}>{weight}</p>
            </div>
            {isGift 
        ?   <GiftLabel title='подарок' text='за первый заказ'/>
        :   <>
                <ButtonCount 
                amount={quantity}
                handleIncrement={() => { dispatch(incrementQuantityCart(addDataProduct)) }}
                handleDecrement={() => { dispatch(decrementQuantityCart(addDataProduct)) }}
                handleCountChange={(newQuantity) => { dispatch(changeProductQuantityCart({ ...addDataProduct, quantity: newQuantity })) }}
                />
                <div className={s.cartPrice}><ProductPrice price={price} discount={discount} type='big' align='right'/></div>
                <button className={s.btnTrash} onClick={() => {dispatch(removeProductCart(addDataProduct))}}><TrashIcon/></button>
            </>
        }
        </div>

        
        
         
        </>
     );
}

export default CartItem;

