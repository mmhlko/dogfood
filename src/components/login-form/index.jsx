
import { useForm } from 'react-hook-form';
import s from './styles.module.css'
import classNames from 'classnames';
import Form from '../form';
import FormInput from '../form-input';
import FormButton from '../form-button';
import { useEffect } from 'react';

function LoginForm({onSubmit, onNavigate, modal}) {

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

    const passwordRegister = register('password', {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру" 
        }
    })

    
    return ( 
        <>
        <Form title={'Вход'} handleForm={handleSubmit(onSubmit)}>
            <FormInput 
                {...emailRegister}
                id='email'
                type='text'
                placeholder='email'
            />
            {errors?.email && <p className='errorMessage'>{errors.email.message}</p>}
            <FormInput 
                {...passwordRegister}
                id='password'
                type='password'
                placeholder='Пароль'
            />
            {errors?.password && <p className='errorMessage'>{errors.password.message}</p>}
            <p onClick={onNavigate('/reset-password')} className={classNames('infoText', s.link)}>Восстановить пароль</p>
            
            <FormButton type='submit' color='primary'>Войти</FormButton>
            <FormButton onClick={onNavigate('/register')} type='button' color='secondary'>Зарегистрироваться</FormButton>
        </Form>

        </>
        
     );
}

export default LoginForm;