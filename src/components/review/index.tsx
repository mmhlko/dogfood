import { createAction } from "@reduxjs/toolkit";
import Rating from "../rating";
import s from './styles.module.css';
import { useSelector } from "react-redux";
import { Spiner } from "../spiner";
import { formattedDate } from "../../utils/products";
import { TReviewResponseDto } from "../../utils/api";


function Review({author, text, city, created_at, rating}:TReviewResponseDto) {

    
    return (
        <>
            <div className={s.review}>
                <div className={s.review__header}></div>
                <div className={s.review__name}>{author.name}</div>
                <div className={s.review__date}>{formattedDate(created_at as Date)}</div>
                <Rating currentRating={rating} />
                {city && <div className={s.review__city}>{city}</div>}
                <p className={s.review__text}>{text}</p>
            </div>       
        </>
         
    
        
     );
}

export default Review;