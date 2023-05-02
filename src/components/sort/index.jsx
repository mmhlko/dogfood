
//import { useContext } from 'react';
import s from './styles.module.css';
import classNames from "classnames";
//import { CardsContext } from '../../contexts/cards-context';
import { sortedProducts } from '../../storage/products/products-slice';
import { useDispatch, useSelector } from 'react-redux';


export function Sort({tabs = []}) {

  //redux replace // const {currentSort, setCurrentSort} = useContext(CardsContext)

  const currentSort = useSelector(state => state.products.currentSort)
  const dispatch = useDispatch();
  function onChangeSort(currentSort) {   
    dispatch(sortedProducts(currentSort))
  }

  function handleClickTab(e, tab) {
    e.preventDefault();
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
