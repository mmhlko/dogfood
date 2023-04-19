import s from './styles.module.css';
import { ReactComponent as StarIcon } from './img/star.svg';
import { useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const MAX_COUNT_RATING = 5;


function Rating({isEditable = false, currentRating, setCurrentRating}) {

    const [ratingArray, setRatingArray] = useState(new Array(MAX_COUNT_RATING).fill(<></>)) //новый пассив из 5 звезд

    const constructRating = (filledRating) => {

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

    function changeDisplay(reating) {
        if (!isEditable || !setCurrentRating) return
        constructRating(reating)
    }

    function changeRating(reating) {
        if (!isEditable || !setCurrentRating) return //если isEditable = false или setCurrentRating не пришла в пропсы, то ничего не делать
        setCurrentRating(reating)
    }

    useEffect(() => constructRating(currentRating), [currentRating])

    return ( 
    <>
        {ratingArray.map((star, i) => <span key={i}>{star}</span>)}
    </>
     );
}

export default Rating;