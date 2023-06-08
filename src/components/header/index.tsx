import s from './styles.module.css';
import './styles.css';
import className from 'classnames';
import { Button } from '../button';
import { FC, FunctionComponent, ReactNode, useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FavoritesIcon } from './img/favorites.svg';
import { ReactComponent as LogoutIcon } from './img/logout.svg';
import { ReactComponent as CartIcon } from './img/cart.svg';
import { ReactComponent as UserIcon } from './img/user.svg';
import { ReactComponent as ProfileIcon } from './img/profile.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../storage/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../storage/hook'; //замена  useSelector

interface IHeaderProp {
  children: ReactNode // тип для входящих в компонент дочерних компонентов
}

//FC<T> - компонент функции 
//type FC<P = {}> = FunctionComponent<P> добавляет свой пропс в FunctionComponent
export const Header: FC<IHeaderProp> = ({children}) => {
//export function Header({children}: IHeaderProp) {

  const location = useLocation();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.products.favoriteProducts) || {length: 0}//стало
  const currentUser = useAppSelector(state => state.user.data)
  const cartCount = useAppSelector(state => state.cart.totalProductsCount)

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
            {cartCount > 0 && <span className={s.iconBubble}>{cartCount}</span>}
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
