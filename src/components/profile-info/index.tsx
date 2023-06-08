import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../storage/hook';
import { ContentHeader } from '../content-header';
import s from './styles.module.css'
import { Button, ButtonVariant } from '../button';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../storage/user/user-slice';

function ProfileInfo() {
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => state.user.data)
    const navigate = useNavigate();
    const handleClickEdit = () => {
        navigate('/profile/edit')
    }
    const handleClickLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <ContentHeader title='Профиль' />
            <div className={s.profileInfo}>
                <img className={s.avatar} src={currentUser?.avatar} alt={currentUser?.name} />
                <div className={s.profileWrap}>
                    <h2 className={s.name}>{currentUser?.name}</h2>
                    <p className={s.text}>{currentUser?.about}</p>
                    <a className={classNames(s.text, s.iconEmail)} href={`mailto:${currentUser?.email}`}>{currentUser?.email}</a>
                </div>
            </div>
            <div className={s.buttonWrap}>
                <Button variant={ButtonVariant.border} href='/profile/edit' action={handleClickEdit}>Изменить</Button>
                <Button variant={ButtonVariant.border} action={handleClickLogout}>Выйти</Button>
            </div>
            


        </>
    );
}

export default ProfileInfo;

