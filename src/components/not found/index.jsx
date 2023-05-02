import { ReactComponent as NotFoundIcon} from './images/notfound-icon.svg'; 
import { Button } from '../button';
import s from './styles.module.css';
import { Link } from 'react-router-dom';

export function NotFound({children, title, buttonText = 'На главную', buttonAction}) {
  return (
    <div className={s.notfound}>
      <NotFoundIcon className={s.image} aria-hidden='true'/>
      <h1 className={s.title}>{title}</h1>
      {children && children}
      {buttonAction
        ? <Button type='border' href='#' action={buttonAction}>{buttonText}</Button>  
        : <Link to='/'><Button type='border'>{buttonText}</Button></Link>
      }
    </div>

  )
}
