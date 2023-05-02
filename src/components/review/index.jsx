import { createAction } from "@reduxjs/toolkit";
import Rating from "../rating";
import s from './styles.module.css';
import { useSelector } from "react-redux";
import { Spiner } from "../spiner";

function Review({author, text, city, create_at, rating, _id, photo}) {

    const {loading} = useSelector(state => state.productsSlice.data.loading)
    return (
        <>
            <div className={s.review}>
                <div className={s.review__header}></div>
                <div className={s.review__name}>{author}</div>
                <div className={s.review__date}>{create_at}</div>
                <Rating rating={rating} />
                <div className={s.review__city}></div>
                <p className={s.review__text}>{text}</p>
            </div>       
        </>
         
    
        
     );
}

export default Review;