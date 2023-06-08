
import { Link, To, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import s from './styles.module.css';
import { ReactComponent as ArrowIcon } from './img/arrow.svg';
const PREV_PAGE = -1;

interface IContentHeaderProps {
  title:string, 
  children?: ReactNode, 
  to?:string, 
  textButton?:string,
  hLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' 
}

export function ContentHeader({title, children, to, textButton, hLevel = 'h1'}:IContentHeaderProps) {

  

  //const navigate = useNavigate();
  return (
    <>
    {/* <a href="#" className={s.buttonBack} onClick={() => navigate(to || -1)}>{textButton}</a> */}
    
    {textButton && <Link to={ to || PREV_PAGE as To} className={s.buttonBack}><ArrowIcon className={s.iconBack}/>{textButton}</Link>}
    <h1 className={s.title}>{title}</h1>
    {children}
    </>

  )
}
