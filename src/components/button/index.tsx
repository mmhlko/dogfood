
import { MouseEvent, ReactNode } from 'react';
import s from './styles.module.css';
import  './style.css';
import classNames from 'classnames';

export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary',
    border = 'border',
    light = 'light',
}

interface IButtonProps {
    variant: any, 
    children: ReactNode, 
    href?: string, 
    extraClass?: any, 
    htmlType?: 'submit' | 'reset' | 'button', 
    action?: () => void
}

export function Button({variant, children, href, extraClass, htmlType='button', action}: IButtonProps) {
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
