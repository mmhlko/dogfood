
import s from './styles.module.css';
import classNames from 'classnames';

export function Button({type, children, extraClass, htmlType='button', action}) {
  return (
    <button 
      type={htmlType} 
      className={classNames(s.button, {
        [s[`button_type_${type}`]]: !!s[`button_type_${type}`], //проверяется если ли такой класс в css, если да, то возвращается true и класс добавляется элементу
        [extraClass]: !!extraClass
      })}
      onClick={action}

    >{children}</button>
  )
}
