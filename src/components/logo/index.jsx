
import './styles.css';
import logoSrc from './assets/logo.svg';

export function Logo() {
  return (
    <a href="/" className='logo'>
      <img src={logoSrc} alt='logo' className='logo__pic' />
    </a>
  );
}
