
import './styles.css';
import { FormEvent, SyntheticEvent } from 'react';
import {ReactComponent as SearchIcon} from './assets/search-icon.svg';
import {ReactComponent as SearchClearIcon} from './assets/close-icon.svg';



interface  ISearchProps {
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void, 
  handleInputChange: (value: string) => void, 
  handleInputClear: (e: SyntheticEvent<HTMLButtonElement>) => void, 
}

export function Search({handleFormSubmit, handleInputChange, handleInputClear}: ISearchProps) {
    
  return (
    <form className='search' onSubmit={handleFormSubmit}>
      <input type="text" className='search__input' 
      onChange={(e) => {
        handleInputChange(e.target.value)}
      } placeholder='поиск'/>
      <button type='submit' className='search__btn search__magnifier_btn'>
        <SearchIcon />        
      </button>
      <button onClick={handleInputClear} className='search__btn search__clear__btn'>
        <SearchClearIcon />
      </button>
    </form>

  )
}
