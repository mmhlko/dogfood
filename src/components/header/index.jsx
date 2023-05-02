

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
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../storage/user/user-slice';

export function Header({children}) {

  const location = useLocation();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.products.favoriteProducts) //стало
  const currentUser = useSelector(state => state.user.data)

  const { toggleTheme } = useContext(ThemeContext)
  //было const { favorites } = useContext(CardsContext)  
  //const {currentUser, onUpdatedUser} = useContext(UserContext) // currentUser context  
  const handleClickButtonEdit = () => {
    /* onUpdatedUser({name: 'Макс', about: 'Пользователь'}) */
  }
  
 
  

  return (
    <header className={s.header}>
      <div className={className('container', s.header__wrapper)}>
        {children}
        <div className={s.iconsMenu}>
          <Link to={{pathname: '/favorites'}} className={s.favoritesLink}>
            <FavoritesIcon />
            {favorites?.length > 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>
          <Link to={{pathname: '/cart'}} className={s.favoritesLink}>
            <CartIcon />
            {favorites?.length > 0 && <span className={s.iconBubble}>{favorites.length + 2}</span>}
          </Link>
          
          
          {/* Записываем в стейт первоначальную страницу с которой нажата кнопка в initialPath, 
          в backgroundLocation предыдущая страница, replace для удаления перехода из истории на странице*/}
          {currentUser
          ?
          <>
            <Link  to={'/profile'} className={s.iconsMenuItem} >
              <ProfileIcon />
              {currentUser.name}
            </Link>
            <Link  to={'/'} className={s.iconsMenuItem} onClick={() => dispatch(logout())}>
              <LogoutIcon />
              Выйти
            </Link>
          </>
 
          : <Link replace to={'/login'} className={s.iconsMenuItem} state={{backgroundLocation: location, initialPath: location.pathname}}>
              <UserIcon />
              Войти
            </Link>
          }          
        </div>
        
      </div>

    </header>
  );
}
