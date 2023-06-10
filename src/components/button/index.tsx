
import { MouseEvent, ReactNode, DetailedHTMLProps, HTMLAttributes} from 'react';
import s from './styles.module.css';
import  './style.css';
import classNames from 'classnames';

export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary',
    border = 'border',
    light = 'light',
}

interface IButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    variant: any, 
    children: ReactNode, 
    href?: string, 
    extraClass?: any, 
    htmlType?: 'submit' | 'reset' | 'button', 
    action?: () => void,
    disabled?: boolean,
}

export function Button({variant, children, href, extraClass, htmlType='button', action, ...props}: IButtonProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    href && e.preventDefault();
    action && action();
  }
  
  return (
    href
        ? <a
            href={href || '#'}
            className={classNames(
                s.button,
                {
                    [s[`button_type_${variant}`]]: !!s[`button_type_${variant}`],
                    [extraClass]: !!extraClass
                }
            )}
            onClick={handleClick}
        >
            {children}
        </a>
        : <button
            {...props}
            type={htmlType}
            className={classNames(
                s.button,
                {
                    [s[`button_type_${variant}`]]: !!s[`button_type_${variant}`],
                    [extraClass]: !!extraClass
                }
            )}
            onClick={action}
        >
            {children}
        </button>
)
}
