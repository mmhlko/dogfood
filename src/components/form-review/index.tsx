
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import s from './styles.module.css'
import classNames from 'classnames';
import Form from '../form';
import FormInput from '../form-input';
import FormButton from '../form-button';
import Rating from '../rating';
import { useState } from 'react';
import { UserReviewBodyDto } from '../../utils/api';
import { fetchCreateReview } from '../../storage/product-item/product-item-slice';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../storage/hook';

interface IFormReviewProps {
    title: string,
    productId: string,
}

type TFormValues = {
    text: string;
    rating: number;
} 


function FormReview({title = 'Отзыв о товаре', productId}: IFormReviewProps) {
    const dispatch = useAppDispatch();
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<UserReviewBodyDto>({mode: 'onBlur'}); //типизируем useForm на то что он принимает данные из отзыва UserReviewBodyDto
    //const [rating, setRating] = useState(5);

    const handleSubmitForm:SubmitHandler<UserReviewBodyDto> = (data) => {
        
        dispatch(fetchCreateReview({productId, data}))
        reset(); //очищает форму после submit
        //setRating(5)
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
        <Controller
                render={({ field }) => (
                    <Rating currentRating={field.value} setCurrentRating={field.onChange} isEditable error={errors.rating} />
                )}
                name="rating"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Укажите рейтинг'
                    }
                }}
            />
        {/* <Rating currentRating={rating} setCurrentRating={setRating} isEditable /> */}
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