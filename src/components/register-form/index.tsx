
import { useForm } from 'react-hook-form';
import s from './styles.module.css'
import Form from '../form';
import FormInput from '../form-input';
import FormButton from '../form-button';
import { UserRegisterBodyDto } from '../../utils/api';

 

interface IRegisterFormProps {
    onSubmit:  (dataform: UserRegisterBodyDto) => void;
    onNavigate: (value: string) => void;
}

function RegisterForm({onSubmit, onNavigate}: IRegisterFormProps) {

    const {register, handleSubmit, formState: {errors}} = useForm<UserRegisterBodyDto>({mode: 'onBlur'});
    
/*     const navigate = useNavigate();
    const location = useLocation();
    const initialPath = location.state?.initialPath; */

    //Переход на страницу  авторизации



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

    const groupRegister = register('group', {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: /^group-[0-9]{1,3}$/,
            message: "Номер группы в формате group-номер" 
        }
    })

        
    return ( 
        <>
        <Form title={'Регистрация'} handleForm={handleSubmit(onSubmit)}>
            <FormInput 
                {...emailRegister}
                id='email'
                type='text'
                placeholder='email'
            />
            {errors?.email && <p className='errorMessage'>{errors.email.message}</p>}
            <FormInput 
                {...groupRegister}
                id='group'
                type='text'
                placeholder='номер группы'
            />
            {errors?.group && <p className='errorMessage'>{errors.group.message}</p>}
            <FormInput 
                {...passwordRegister}
                id='password'
                type='password'
                placeholder='Пароль'
            />
            {errors?.password && <p className='errorMessage'>{errors.password.message}</p>}
            <p className='infoText'>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
            <FormButton type='submit' color='primary' extraClass={s.formButton}>Зарегистрироваться</FormButton>
            <FormButton onClick={() => onNavigate('/login')} type='button' color='secondary' extraClass={s.formButton}>Войти</FormButton>
        </Form>
        
        
        
        
        
        
        
        
        
        
        {/* <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
            <h3>Регистрация</h3>
            <input 
                {...register('name', {
                    required: {
                        value: true,
                        message: 'Обязательное поле'
                    },
                    min: {
                        value: 3,
                        message: 'Минимальное число 3'
                    }
                })}
                type="text"                 
                placeholder="Имя" 

            />
            {errors.name && <p>{errors.name.message}</p>}
            <input 
                {...emailRegister}
                type="email"                 
                placeholder="email" 
                autoComplete='none'

            />
            {errors.email && <p>{errors.email.message}</p>}
            <input
                {...register('password', {
                    required: true,
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру" 
                    }
                })} 
                type="password"                 
                placeholder="Введите пароль"
                autoComplete='none' 

            />
            {errors.password && <p>{errors.password.message}</p>}
            <button>Зарегистрироваться</button>
        </form> */}
        </>
        
     );
}

export default RegisterForm;