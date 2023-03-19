

//import './styles.css';

import s from './styles.module.css';
import className from 'classnames';
import { Button } from '../button';

export function Header({children, user, onUpdatedUser}) {
  const handleClickButtonEdit = () => {
    onUpdatedUser({name: 'Максим', about: 'Пользователь'})
}

  return (
    <header className={s.header}>
      <div className={className('container', s.header__wrapper)}>
        {children}
        {user && 
        <div className={s.header__userInfo}>
          <span>{user.name} : {user.about}</span>
          <span>{user.email}</span>
          <Button action={handleClickButtonEdit}>Изменить</Button>  
        </div>}
        
      </div>

    </header>
  );
}
