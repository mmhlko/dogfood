
import { useContext } from 'react';
import s from './styles.module.css';
import classNames from "classnames";
import { CardsContext } from '../../contexts/cards-context';


export function Sort({tabs = []}) {

  const {currentSort, setCurrentSort, onChangeSort} = useContext(CardsContext)

  function handleClickTab(e, tab) {
    e.preventDefault();
    setCurrentSort(tab.id)
    onChangeSort(tab.id)
  }

  return (
    <div className={s.sort}>
      {tabs.map((tab, index) =>   (
          <a key={index} 
            className={classNames(s.sort__link, {[s.sort__link_selected]: currentSort === tab.id})} 
            href="#" 
            onClick={(e) => handleClickTab(e, tab)}>{tab.title}
          </a>
      ))}
    </div>
  )
}
