import ProfileForm from '../../components/profile-form';
import ProfileInfo from '../../components/profile-info';
import { useAppSelector } from '../../storage/hook';
import s from './styles.module.css'

function ProfilePage() {

    const user = useAppSelector(state => state.user.data)

    return ( 
        <>
            <div className='content container'>
                <ProfileInfo />
                <ProfileForm />
            </div>
        </>
     );
}

export default ProfilePage;

