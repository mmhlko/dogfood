import { Selector, createSelector, createSlice } from '@reduxjs/toolkit';
import { calcDiscountPrice } from '../../utils/products';
import { TProductInCart } from '../../types';
import { RootState } from '../types';

type TCartState = {
    totalProductsCount: number,
    data: TProductInCart[],
}

interface ICartInfo {
    amount: number,
    amountWithDiscount: number,
    totalDiscount: number,
    totalCount: number
}



const initialState: TCartState = {
    data: [],
    totalProductsCount: 0
}

export const sliceName = 'cart'

const selectCartData = (state: RootState) => state.cart.data;


//Чтобы брать данные и делать над ними вычисления нужен createSelector, он следит за изменениями стора
// createSelector пересчитывается при изменении стора
/*  Первый аргумент это функция или массив функций,
    Второй аргумент это то, что вернула эта функция 
    selectCartData вернет state.cart.data это и будет cart(массив их товаров)*/
export const cartInfoSelector: Selector<RootState, ICartInfo> = createSelector(selectCartData, (cart) => {
    return cart.reduce((total, item) => {
        const priceDiscount = calcDiscountPrice(item.price, item.discount);
        total['amount'] += item.price * item.quantity;
        total['amountWithDiscount'] += priceDiscount * item.quantity;
        total['totalDiscount'] += (item.price - priceDiscount) * item.quantity;
        total['totalCount'] += item.quantity;

        return total
    }, {
        amount: 0,
        amountWithDiscount: 0,
        totalDiscount: 0,
        totalCount: 0
    })
}
)

/* console.log(cartInfoSelector);
 */

const CartSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addProductCart: (state, action) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id);
            if (itemInCart) {
                itemInCart.quantity++;
            }
            else {
                state.data.push({ ...action.payload, quantity: 1 })

            }
            state.totalProductsCount++;
        },
        removeProductCart: (state, action) => {
            state.data = state.data.filter(item => {
                if (item._id === action.payload._id) {
                    state.totalProductsCount -= action.payload.quantity;
                }
                return item._id !== action.payload._id

            })
        },
        changeProductQuantityCart: (state, action) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id);
            if (itemInCart) {
                if (itemInCart.quantity < action.payload.quantity) {
                    state.totalProductsCount += action.payload.quantity - itemInCart.quantity;
                } else {
                    state.totalProductsCount -= itemInCart.quantity - action.payload.quantity;
                }
            }            

            if (itemInCart && action.payload.quantity > 0) {
                itemInCart.quantity = action.payload.quantity
            } else {
                state.data.push({ ...action.payload, quantity: action.payload.quantity })
            }



        },
        incrementQuantityCart: (state, action) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.data.push({ ...action.payload, quantity: 1 })
            }
            state.totalProductsCount++;
        },
        decrementQuantityCart: (state, action) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id);
            if (itemInCart) {
                if (itemInCart.quantity === 1) {
                    itemInCart.quantity = 1;
                }
                else {
                    itemInCart.quantity--;
                    state.totalProductsCount--;
                }
            }
            
        },
    },

})
export const { addProductCart, removeProductCart, changeProductQuantityCart, incrementQuantityCart, decrementQuantityCart } = CartSlice.actions //экспортируем отдельно
export default CartSlice.reducer;



