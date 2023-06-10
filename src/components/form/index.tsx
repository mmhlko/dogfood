import { ReactNode, useState } from 'react';
import s from './styles.module.css'
import classNames from 'classnames';

interface IFormProps {
    handleForm: (data:any) => void, 
    children?: ReactNode, 
    title?: string
    align?: 'left' | 'center' | 'rigth'
}


function Form({handleForm, children, title, align='center'}: IFormProps) {
   
    return ( 
        <form onSubmit={handleForm} className={classNames(s.form, {[s[align]]: !!align}) }>
            {title && <h3 className={s.title}>{title}</h3>}
            {children}
        </form>
     );
}

export default Form;