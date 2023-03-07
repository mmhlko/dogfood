import {useState } from 'react';
import { CardList } from '../card-list';
import { Footer } from '../footer';
import { Header } from '../header';
import { Sort } from '../sort';
import { dataCard } from '../../data';
import './styles.css';
import { Logo } from '../logo';
import { Search } from '../search';

export function App() {
  const [cards, setCards] = useState(dataCard);
  const [searchQuery, setSearchQuery] = useState('');

  const [value, setValue] = useState('');
  
  function handleInputClear(e) { 
    e.preventDefault();     
    setValue('');
    setSearchQuery('');
    setCards(dataCard)
       
  }

  function handleRequest() {
    
    const filterCards = dataCard.filter(item => 
      item.name.includes(searchQuery))

    setCards(filterCards)

  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput)
  }

 /*  useEffect(() => {
    handleRequest()
  }, [searchQuery]) */

  function handleFormSubmit(evnt) {
    evnt.preventDefault();
    handleRequest();
    
  }

  


  return (
    <>
      <Header>
        <Logo />
        <Search handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} handleInputClear={handleInputClear} value={value} setValue={setValue}/>
      </Header>
      <main className="content container">
        <Sort />
        <CardList goods={cards} />
      </main>
      <Footer />
    </>
  );
}
