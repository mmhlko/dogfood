import { ReactComponent as NotFoundIcon} from './images/notfound-icon.svg'; 
import { ReactNode } from 'react';
import { Button } from '../button';
import s from './styles.module.css';
import { Link } from 'react-router-dom';

type TNotFoundProps = {
  children?: ReactNode, 
  title: string, 
  buttonText?: string, 
  buttonAction?: () => void
}

export function NotFound({children, title, buttonText = 'На главную', buttonAction}: TNotFoundProps) {
  return (
    <div className={s.notfound}>
      <NotFoundIcon className={s.image} aria-hidden='true'/>
      <h1 className={s.title}>{title}</h1>
      {children && children}
      {buttonAction
        ? <Button variant={'border'} href='#' action={buttonAction}>{buttonText}</Button>  
        : <Link to='/'><Button variant='border'>{buttonText}</Button></Link>
      }
    </div>

  )
}
