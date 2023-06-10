import s from './styles.module.css';
import { ReactComponent as StarIcon } from './img/star.svg';
import { useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SerializedError } from '@reduxjs/toolkit';

const MAX_COUNT_RATING = 5;

interface IRatingProps {
    isEditable?: boolean, 
    currentRating: number, 
    setCurrentRating?: (number:number) => void,
    error?: any
}

function Rating({isEditable = false, currentRating, setCurrentRating, error}: IRatingProps) {

    const [ratingArray, setRatingArray] = useState(new Array(MAX_COUNT_RATING).fill(<></>)) //новый пассив из 5 звезд

    const constructRating = (filledRating:number) => {

        const updateRatingArray = ratingArray.map((star, i) => {
            return (
                /* с помощью classNames добавляю класс заливки при true */
                <StarIcon className={classNames(s.star, 
                    {
                        [s.filled]: filledRating > i,
                        [s.editable]: isEditable
                    
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(currentRating)}
                    onClick={() => changeRating(i + 1)}
                />
            )
        } )
        
        setRatingArray(updateRatingArray)
    }

    function changeDisplay(rating:number) {
        if (!isEditable || !setCurrentRating) return
        constructRating(rating)
    }

    function changeRating(rating:number) {
        if (!isEditable || !setCurrentRating) return //если isEditable = false или setCurrentRating не пришла в пропсы, то ничего не делать
        setCurrentRating(rating)
    }

    useEffect(() => constructRating(currentRating), [currentRating])

    return ( 
    <div className='rating__container'>
        {ratingArray.map((star, i) => <span key={i}>{star}</span>)}
        {error && <p className='errorMessage'>{error.message}</p>}
    </div>
     );
}

export default Rating;