
//import { useContext } from 'react';
import s from './styles.module.css';
import classNames from "classnames";
//import { CardsContext } from '../../contexts/cards-context';
import { sortedProducts } from '../../storage/products/products-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../storage/hook';
import { Tab } from '../../utils/constants';
import { SyntheticEvent } from 'react';

interface ISortProps {
  tabs: Tab[];
}

export function Sort({tabs = []}:ISortProps) {

  //redux replace // const {currentSort, setCurrentSort} = useContext(CardsContext)

  const currentSort = useAppSelector(state => state.products.currentSort)
  const dispatch = useAppDispatch();

  function onChangeSort(currentSort:string) {   
    dispatch(sortedProducts(currentSort))
  }

  function handleClickTab(e:SyntheticEvent<HTMLAnchorElement>, tab:Tab) {
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
