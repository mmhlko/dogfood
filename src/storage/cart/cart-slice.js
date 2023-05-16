import {createSelector, createSlice} from '@reduxjs/toolkit';
import { calcDiscountPrice } from '../../utils/products';


const initialState = {
    data: [],
    totalProductsCount: 0
}

export const sliceName = 'cart'

const selectCartData = (state) => state.cart.data;

export const cartInfoSelector = createSelector(selectCartData, (cart) => {
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
                state.data.push({...action.payload, quantity: 1})
                
            }
            state.totalProductsCount++;
        },
        removeProductCart: (state, action) => {
            state.data = state.data.filter(item => {
                if (item._id === action.payload._id) {
                    state.totalProductsCount -=  action.payload.quantity;
                }
                return item._id !== action.payload._id
            
            })
        },
        changeProductQuantityCart: (state, action) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id);
            
            if (itemInCart.quantity < action.payload.quantity) {
                state.totalProductsCount += action.payload.quantity - itemInCart.quantity;
            } else {
                state.totalProductsCount -= itemInCart.quantity - action.payload.quantity;
            }

            if (itemInCart && action.payload.quantity > 0) {
                itemInCart.quantity = action.payload.quantity
            } else {
                state.data.push({...action.payload, quantity: action.payload.quantity})
            }
            
            
            
        },
        incrementQuantityCart: (state, action) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id);
            if (itemInCart) {
                itemInCart.quantity++;
            }   else {
                state.data.push({...action.payload, quantity: 1})
            }
            state.totalProductsCount++;
        },
        decrementQuantityCart: (state, action) => {
            const itemInCart = state.data.find(item => item._id === action.payload._id);
            if (itemInCart === 1) {
                itemInCart.quantity = 1;
            }
            else {
                itemInCart.quantity--;
                state.totalProductsCount--;
            }
        },
    },
    
})
export const { addProductCart, removeProductCart, changeProductQuantityCart, incrementQuantityCart, decrementQuantityCart } = CartSlice.actions //экспортируем отдельно
export default CartSlice.reducer;



