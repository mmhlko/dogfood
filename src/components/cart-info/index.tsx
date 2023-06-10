import { useSelector } from 'react-redux';
import s from './styles.module.css'
import { useAppSelector } from '../../storage/hook';



function CartInfo() {

    const { totalProductsCount: count } = useAppSelector(state => state.cart)

    return ( 
        
        <>
        <div className={s.cartTitle}>
            <span>{count} товаров в корзине</span>
        </div>
        </>
     );
}

export default CartInfo;

