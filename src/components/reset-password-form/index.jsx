
import { useForm } from 'react-hook-form';
import s from './styles.module.css'
import classNames from 'classnames';
import Form from '../form';
import FormInput from '../form-input';
import FormButton from '../form-button';

function ResetPasswordForm({onSubmit, onNavigate, modal}) {

    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});
    

    const emailRegister = register('email', {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Email не соотвествует формату электронной почты"
        }
    })

    
    return ( 
        <>
        <Form title={'Восстановление пароля'} handleForm={handleSubmit(onSubmit)}>
            <FormInput 
                {...emailRegister}
                id='email'
                type='text'
                placeholder='email'
            />
            {errors?.email && <p className='errorMessage'>{errors.email.message}</p>}            
            <p className='infoText'>Срок действия временного пароля 24 ч.</p>
            <FormButton type='submit' color='primary'>Восстановить</FormButton>
            <FormButton onClick={onNavigate('/')} type='button' color='secondary'>На Главную</FormButton>
        </Form>

        </>
        
     );
}

export default ResetPasswordForm;