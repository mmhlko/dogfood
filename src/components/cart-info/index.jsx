import { useSelector } from 'react-redux';
import s from './styles.module.css'


function CartInfo() {

    const { totalProductsCount: count } = useSelector(state => state.cart)

    return ( 
        
        <>
        <div className={s.cartTitle}>
            <span>{count} товаров в корзине</span>
        </div>
        </>
     );
}

export default CartInfo;

