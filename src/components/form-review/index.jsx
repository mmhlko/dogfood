
import { useForm } from 'react-hook-form';
import s from './styles.module.css'
import classNames from 'classnames';
import Form from '../form';
import FormInput from '../form-input';
import FormButton from '../form-button';
import Rating from '../rating';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateReview } from '../../storage/product-item/product-item-slice';


function FormReview({title = 'Отзыв о товаре', productId}) {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: 'onBlur'});
    const [rating, setRating] = useState(5);

    const handleSubmitForm = (data) => {
        console.log('handleSubmitForm', {...data, rating});
        dispatch(fetchCreateReview({productId, data}))
        reset(); //очищает форму после submit
        setRating(5)
    }

    const textRegister = register('text', {
        required: {
            value: true,
            message: "Обязательное поле"
        }
    })

    
    return ( 
        <>
        <h2>{title}</h2>
        <Rating currentRating={rating} setCurrentRating={setRating} isEditable />
        <Form handleForm={handleSubmit(handleSubmitForm)}>
            
            <FormInput 
                {...textRegister}
                typeTag='textarea'
                id='text'
                placeholder='Напишите текст отзыва'
            />
            {errors?.text && <p className='errorMessage'>{errors.text.message}</p>}
                        
            <FormButton type='submit' color='primary'>Отправить отзыв</FormButton>
        </Form>

        </>
        
     );
}

export default FormReview;