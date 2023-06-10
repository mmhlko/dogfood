
import { ContentHeader } from '../../components/content-header';
import s from './styles.module.css'
import CartInfo from '../../components/cart-info';
import { useSelector } from 'react-redux';
import { CartList } from '../../components/cart-list';
import { NotFound } from '../../components/not found';
import { useNavigate } from 'react-router-dom';
import { CartAmount } from '../../components/cart-amount';
import { useAppSelector } from '../../storage/hook';



function CartPage() {
    const productsCart = useAppSelector(state => state.cart.data);
    const navigate = useNavigate();
    
    return ( 
        <div className="content container">
        <ContentHeader title='Корзина' />
        {productsCart.length === 0
        ? <NotFound buttonText='На главную' title="В корзине нет товаров" buttonAction={() => { navigate('/') }} />
        : <div className={s.contentCart}>
            
            <CartInfo/>
            <CartList productsCart={productsCart} />
            <CartAmount />
            </div>
        }
        </div>
     );
}

export default CartPage;

