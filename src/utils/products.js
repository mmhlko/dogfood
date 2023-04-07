export const isLiked = (likes, userId) => likes?.some(id => id === userId)
export const calcDiscountPrice = (price, discount) => Math.round(price * (1 - discount/100) )