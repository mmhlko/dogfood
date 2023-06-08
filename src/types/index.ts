export type TUser = {
    name: string,
    about: string,
    avatar: string,
    _id: string,
    email: string,
    group?: string

}

export type TProduct = {
    discount: number,
    stock: number,
    available: true,
    pictures: string,
    likes: string[],
    reviews: TReview[],
    tags: string[],
    isPublished: true,
    _id: string,
    name: string,
    author: TUser,
    price: number,
    wight: string,
    description: string,   
    
}

export type TReview ={
    rating: number,
    _id: string,
    text: string,
    author: TUser,
    product: string,
    city?: string
}

export type TProductInCart = {
    discount: number,
    pictures: string,
    _id: string,
    name: string,
    price: number,
    wight: string,
    quantity: number;
    isGift?: boolean;
}