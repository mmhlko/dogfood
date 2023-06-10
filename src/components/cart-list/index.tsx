import { TProductInCart } from '../../types';
import { TProductsResponseDto } from '../../utils/api';
import CartItem from '../cart-item';
import s from './styles.module.css'

export function CartList({productsCart}: {productsCart: TProductInCart[]}) {
  return (
    <div className={s.cartList}>      
      {productsCart.map((dataItem, index) => <CartItem key={index} {...dataItem}/>)}      
    </div>
  );
}
