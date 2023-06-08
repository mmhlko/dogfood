import classNames from 'classnames'; 
import s from './styles.module.css'
import { forwardRef } from 'react';


//берет возможные пропсы для элемента инпута
interface IFormInputProps extends React.HTMLProps<HTMLInputElement>{
    typeTag: string;
    
}

const FormInput = forwardRef<HTMLInputElement, any>(({typeTag, ...props}, ref) => {
    return ( 
        typeTag === 'textarea'
            ? <textarea ref={ref} className={classNames(s.input, s.textarea)} {...props}/>
            : <input ref={ref} className={s.input} {...props}/>

     );
})

export default FormInput;