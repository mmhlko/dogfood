import { Outlet } from 'react-router-dom';
import ProfileForm from '../../components/profile-form';
import ProfileInfo from '../../components/profile-info';
import { useAppSelector } from '../../storage/hook';
import s from './styles.module.css'

function ProfilePage() {

    const user = useAppSelector(state => state.user.data)

    return ( 
        <>
            <div className='content container'>
{/*                 <ProfileInfo />
                <ProfileForm /> */}
                <Outlet /> {/* для вложенного роутинга */}
            </div>
        </>
     );
}

export default ProfilePage;

