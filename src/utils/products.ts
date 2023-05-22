import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TProduct } from '../types';

export interface IcheckProductInCart {
    quantity: number, 
    exist: boolean
}

export interface ICartProduct extends TProduct {
    quantity: number
}

dayjs.locale('ru');
export function formattedDate(date: Date) {
    const data = dayjs(date).format("DD MMM YYYY");
    return data.replace('.', "");
}


export const isLiked = (likes: string[], userId:string) => likes?.some(id => id === userId)
export const calcDiscountPrice = (price:number, discount:number) => Math.round(price * (1 - discount/100) )

export const checkProductInCart = (cartProducts: ICartProduct[], productID: string):IcheckProductInCart => {
    const productInCart = cartProducts.find(cartProduct => cartProduct._id === productID)

    if (productInCart?.quantity) {
        return {quantity: productInCart.quantity, exist: true}
    } else {
        return {quantity: 0, exist: false}
    }
}