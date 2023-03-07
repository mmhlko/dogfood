
import { Logo } from '../logo';
import { Search } from '../search';
import './styles.css';

export function Header({children}) {
  return (
    <header className='header'>
      <div className="container header__wrapper">
        {children}
      </div>
    </header>
  );
}
