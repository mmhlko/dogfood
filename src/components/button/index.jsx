
import s from './styles.module.css';
import classNames from 'classnames';

export function Button({type, children, href, extraClass, htmlType='button', action}) {
  function handleClick(e) {
    href && e.preventDefault();
    action();
  }
  
  return (
    href
        ? <a
            href={href || '#'}
            className={classNames(
                s.button,
                {
                    [s[`button_type_${type}`]]: !!s[`button_type_${type}`],
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
                    [s[`button_type_${type}`]]: !!s[`button_type_${type}`],
                    [extraClass]: !!extraClass
                }
            )}
            onClick={action}
        >
            {children}
        </button>
)
}
