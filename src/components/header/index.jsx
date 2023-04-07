

//import './styles.css';

import s from './styles.module.css';
import './styles.css';
import className from 'classnames';
import { Button } from '../button';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { ThemeContext } from '../../contexts/theme-context';
import { CardsContext } from '../../contexts/cards-context';
import { Link } from 'react-router-dom';
import { ReactComponent as FavoritesIcon } from './img/favorites.svg';

export function Header({children}) {
  const { toggleTheme } = useContext(ThemeContext)
  const { favorites } = useContext(CardsContext)
  const {currentUser, onUpdatedUser} = useContext(UserContext) // currentUser context
  const handleClickButtonEdit = () => {
    onUpdatedUser({name: 'Макс', about: 'Пользователь'})
}

  return (
    <header className={s.header}>
      <div className={className('container', s.header__wrapper)}>
        {children}
        <div className={s.iconsMenu}>
          <Link to={{pathname: '/favorites'}} className={s.favoritesLink}>
            <FavoritesIcon />
            {favorites.length > 0 && <span className={s.iconBubble}>{favorites.length}</span>}
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
