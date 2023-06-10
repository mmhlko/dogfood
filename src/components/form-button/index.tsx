import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import s from './styles.module.css';
import classNames from 'classnames';

export enum FormButtonSize {
    'full'= 'full',
    'minContent'= 'minContent',   
}

interface IFormButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
    type: "button" | "submit" | "reset" | undefined;
    color: 'primary' | 'secondary';
    extraClass?: string;
    size?:  FormButtonSize;
}


function FormButton({children, color, size=FormButtonSize.minContent ,extraClass, ...props}: IFormButtonProps) {
    return ( 
        <button 
        {...props} 
        className={classNames(s.btn, s[color], {[extraClass as string]: !!extraClass, [s[size]]: !!size})}>
            {children}
        </button>
     );
}

export default FormButton;

