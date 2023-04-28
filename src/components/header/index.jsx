

//import './styles.css';

import s from './styles.module.css';
import './styles.css';
import className from 'classnames';
import { Button } from '../button';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { ThemeContext } from '../../contexts/theme-context';
import { CardsContext } from '../../contexts/cards-context';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FavoritesIcon } from './img/favorites.svg';
import { ReactComponent as LogoutIcon } from './img/logout.svg';
import { ReactComponent as CartIcon } from './img/cart.svg';
import { ReactComponent as UserIcon } from './img/user.svg';
import { ReactComponent as ProfileIcon } from './img/profile.svg';

export function Header({children}) {
  const { toggleTheme } = useContext(ThemeContext)
  const { favorites } = useContext(CardsContext)
  const {currentUser, onUpdatedUser} = useContext(UserContext) // currentUser context
  const handleClickButtonEdit = () => {
    onUpdatedUser({name: 'Макс', about: 'Пользователь'})
  }

  const location = useLocation();

  return (
    <header className={s.header}>
      <div className={className('container', s.header__wrapper)}>
        {children}
        <div className={s.iconsMenu}>
          <Link to={{pathname: '/favorites'}} className={s.favoritesLink}>
            <FavoritesIcon />
            {favorites.length > 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>
          <Link to={{pathname: '/cart'}} className={s.favoritesLink}>
            <CartIcon />
            {favorites.length > 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>
          
          
          {/* Записываем в стейт первоначальную страницу с которой нажата кнопка в initialPath, 
          в backgroundLocation предыдущая страница, replace для удаления перехода из истории на странице*/}
          <Link replace to={'/login'} className={s.iconsMenuItem} state={{backgroundLocation: location, initialPath: location.pathname}}>
            <UserIcon />
            Войти
          </Link>

          <Link  to={'/profile'} className={s.iconsMenuItem} >
            <ProfileIcon />
            Максим
          </Link>
          <Link  to={'/'} className={s.iconsMenuItem} >
            <LogoutIcon />
            Выйти
          </Link>
        </div>


       {/*  {currentUser && 
        <div className={s.header__userInfo}>
          <span>{currentUser.name} : {currentUser.about}</span>
          <span>{currentUser.email}</span>
          <Button action={handleClickButtonEdit}>Изменить</Button>
          <label className="wraper" htmlFor="something">
          <div className="switch-wrap">
            <input type="checkbox" id="something" onChange={toggleTheme} />
            <div className="switch"></div>
          </div>
        </label>  
        </div>} */}
        
      </div>

    </header>
  );
}
