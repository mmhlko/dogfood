import s from './styles.module.css';
import classNames from 'classnames';

function FormButton({children, color, ...props}) {
    return ( 
        <button {...props} className={classNames(s.btn, s[color])}>
            {children}
        </button>
     );
}

export default FormButton;

