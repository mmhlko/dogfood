import s from './styles.module.css'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import iconCat1 from './img/ic-cat-01.svg';
import iconCat2 from './img/ic-cat-02.svg';
import iconCat3 from './img/ic-cat-03.svg';
import iconCat4 from './img/ic-cat-04.svg';
import iconCat5 from './img/ic-cat-05.svg';
import iconCat6 from './img/ic-cat-06.svg';

const dataCategory = [
    {
        title: "Наборы",
        icon: iconCat1,
        slug: "/catalog",
    },
    {
        title: "Лакомства",
        icon: iconCat2,
        slug: "/catalog",
    },
    {
        title: "Аксессуары",
        icon: iconCat3,
        slug: "/catalog",
    },
    {
        title: "Игрушки",
        icon: iconCat4,
        slug: "/catalog",
    },
    {
        title: "Рога",
        icon: iconCat5,
        slug: "/catalog",
    },
    {
        title: "Масла",
        icon: iconCat6,
        slug: "/catalog",
    }
]

interface CategoryMenuProps {
    extraClass: string
}

function CategoryMenu({extraClass}:CategoryMenuProps) {
    return ( 
        <div className={classNames('box', s.menu, {[s[extraClass]]: extraClass})}>
            <ul className={s.list}>
                {dataCategory.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={item.slug} className={s.item}>
                                <img className={s.image} src={item.icon} alt={item.title} />
                                <span className={s.title}>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}

export default CategoryMenu;

