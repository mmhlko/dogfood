
import './styles.css';

import {ReactComponent as SearchIcon} from './assets/search-icon.svg';
import {ReactComponent as SearchClearIcon} from './assets/close-icon.svg';
import { useState } from 'react';

export function Search({handleFormSubmit, handleInputChange}) {
  
  const [value, setValue] = useState('vcvc')
  
  function handleInputClear(e) { 
    e.preventDefault();     
    setValue('');     
  }
  
  return (
    <form className='search' onSubmit={handleFormSubmit}>
      <input value={value} type="text" className='search__input' onChange={(e) =>{
    handleInputChange(e.target.value)
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
