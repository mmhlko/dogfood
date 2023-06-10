import { Button, ButtonVariant } from '../button';
import s from './styles.module.css';
import classNames from 'classnames';
import { ReactComponent as ArrowIcon } from './img/arrow.svg';

import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { useNavigate } from 'react-router-dom';

const link = '/catalog'

function Hero() {
    
    const navigate = useNavigate();

    function handleButtonClick () {
        navigate(link)
    }
    return ( 
        <div className={s.banner}>
            <div className={classNames('container', s.container)}>
                <h1 className={s.title}>Крафтовое лакоство для собак</h1>
                <p className={s.subtitle}>Всегда свежее лакомство ручной работы с доствкой по России и миру</p>
                <Button 
                    variant={ButtonVariant.light} 
                    href={link} 
                    extraClass={'button_type_box'}
                    action={handleButtonClick}
                >
                    <span>Каталог</span><ArrowIcon className={s.link}/>
                </Button>
            </div>
        </div>
     );
}

export default Hero;

