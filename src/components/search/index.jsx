
import './styles.css';

import {ReactComponent as SearchIcon} from './assets/search-icon.svg';
import {ReactComponent as SearchClearIcon} from './assets/close-icon.svg';



export function Search({handleFormSubmit, handleInputChange, handleInputClear, value, setValue}) {
    
  return (
    <form className='search' onSubmit={handleFormSubmit}>
      <input value={value} type="text" className='search__input' onChange={(e) =>{
    setValue(e.target.value);
    handleInputChange(e.target.value);
  } } placeholder='поиск'/>
      <button type='submit' className='search__btn'>
        <SearchIcon />        
      </button>
      <button onClick={handleInputClear} type='clear' className='search__btn search__clear__btn'>
        <SearchClearIcon />
      </button>
    </form>

  )
}
