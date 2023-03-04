
import './styles.css';

import {ReactComponent as SearchIcon} from './assets/search-icon.svg';
import {ReactComponent as SearchCloseIcon} from './assets/close-icon.svg';

export function Search() {
  return (
    <form action="search" className='search'>
      <input type="text" className='search__input' placeholder='поиск'/>
      <button className='search__btn'>
        <SearchIcon />
        <SearchCloseIcon />
      </button>
    </form>

  )
}
