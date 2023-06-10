
import './styles.css';
import logoSrc from './assets/logo.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ILogoProps {
  className?: string, 
  href?: string,
  title?: string
}

export function Logo({className, href, ...props}: ILogoProps) {
  const hrefValue = href ? href : null
  return (
    hrefValue 
      ? <Link /* replace не добавляет в историю хождения на странице */ to={{pathname: hrefValue}} className={classNames('logo', {className: !!className})} {...props}>
          <img src={logoSrc} alt='logo' className='logo__pic' />
        </Link>
      : <span className={`${className} logo`} {...props}>
          <img src={logoSrc} alt='logo' className='logo__pic' />
        </span>  

  );
}
