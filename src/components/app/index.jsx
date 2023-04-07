import { useState, useEffect } from 'react';
import { CardList } from '../card-list';
import { Footer } from '../footer';
import { Header } from '../header';
import { Sort } from '../sort';
import { dataCard } from '../../data';
import '../../utils/api.js'
import { Logo } from '../logo';
import { Search } from '../search';
import { Button } from '../button';
import api from '../../utils/api'
import { useDebounce } from '../../hooks/useDebounce';
import { isLiked } from '../../utils/products';
import FaqPage from '../../pages/FAQ';
import { Route, Routes } from 'react-router-dom';
//страницы

import { CatalogPage } from '../../pages/catalog page';
import { ProductPage } from '../../pages/product page';
import NotFoundPage from '../../pages/not found page';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/cards-context';
import { ThemeContext, themes } from '../../contexts/theme-context';
import { light } from '@mui/material/styles/createPalette';
import { FavoritePage } from '../../pages/Favorite page';
import { TABS, TABS_ID } from '../../utils/constants';


//import s from './styles.module.css';


export function App() {
  const [cards, setCards] = useState([]); //стейт для карточек для рендеринга
  const [defaultCards, setDefaultCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentSort, setCurrentSort] = useState(TABS_ID.DEFAULT);
  const [currentUser, setCurrentUser] = useState(null) //стейт для авторизованного пользователя
  const [searchQuery, setSearchQuery] = useState(''); //стейт для строки поиска
  const [value, setValue] = useState('');//стейт значение в инпуте строки
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState(themes.light);
  const debounceSearchQuery = useDebounce(searchQuery, 300)


  function handleInputClear(e) {
    e.preventDefault();
    setValue('');
    setSearchQuery('');
    setCards(dataCard)

  }

  function handleRequest() {

    /*     const filterCards = dataCard.filter(item => 
          item.name.includes(searchQuery))
    
        setCards(filterCards) */

    api.search(debounceSearchQuery)
      .then((dataSearch) => {
        setCards(dataSearch)

      })

  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput)
  }

  function handleFormSubmit(evnt) {
    evnt.preventDefault();
    console.log('submit');
    handleRequest();

  }

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updatedUser) => {
        setCurrentUser(updatedUser)
      })
  }

  function handleProductLike(product) {
    //true or false => проверка есть ли лайк данного пользователя в объекте лайков в продукте
    const like = isLiked(product.likes, currentUser._id)
    return api.changeLikeProductStatus(product._id, like)
      .then((updatedCard) => {
          const newProducts = cards.map(cardState => { //карточка в стейте cards
           return cardState._id === updatedCard._id? updatedCard : cardState
          })
          setCards(newProducts)

          if (!like) { //если лайка не было, то при нажатии на лайк карточка добвится в массив избранных карточек
            setFavorites(prevState => [...prevState, updatedCard])
          } else { //если лайк стоял, лайк убирается и возвращается отфильтрованный массив в стейт избранных карточек
            setFavorites(prevState => prevState.filter(card => card._id !== updatedCard._id))
          }

          return updatedCard
      })
  }  

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])


  useEffect(() => {
    setIsLoading(true)
    api.getAllInfo() //нужен чтобы запрос пользователя был вместе с продуктам, чтоб рендеринг был после определения пользователя
      .then(([userInfoData, productsData]) => {
        setCurrentUser(userInfoData); //асинхронная операция
        setCards(productsData.products) //асинхронная операция    
        setDefaultCards(productsData.products)
               
        // console.log(state) (покажет старый стейт или null) сработает раньше чем //асинхронная операция выше
        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userInfoData._id))
        setFavorites(favoriteProducts)
      })      
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))

    /* api.getProductList()
      .then(data => setCards(data.products))
      .catch(err => console.log(err))

    api.getUserInfo()
      .then(user => setCurrentUser(user))
      .catch(err => console.log(err)) */

  }, [])

  function sortedData(currentSort) {
    switch (currentSort) {
      case (TABS_ID.CHEAP):
        setCards(cards.sort((a, b) => a.price - b.price));
        
        break;
      case (TABS_ID.LOW):
        setCards(cards.sort((a, b) => b.price - a.price));
        
        break;
      case (TABS_ID.DISCOUNT):
        setCards(cards.sort((a, b) => b.discount - a.discount));
        
        break;

      default:
        console.log('default');
        setCards(defaultCards);
        break;
    }

  }

  function toggleTheme() {
    theme === themes.dark? setTheme(themes.light) : setTheme(themes.dark)
  }
  

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <CardsContext.Provider 
      value={{
        cards, 
        favorites, 
        handleLike: handleProductLike, 
        isLoading,
        onChangeSort: sortedData,
        currentSort,
        setCurrentSort
        }}>
    <UserContext.Provider value={{currentUser, onUpdatedUser: handleUpdateUser}}>
      <Header>

        <Logo href='/' />
        <Routes>
          <Route path='/' element={<Search handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} handleInputClear={handleInputClear} value={value} setValue={setValue} />}/>
          <Route path='*' element={null} />
        </Routes>
        
        
      </Header>
      <main className="content container" style={{backgroundColor: theme.background, color: theme.color}}>
        <Routes>
          {/* <Route path='/' element={<span>Главная</span>}/> */}
          <Route path='/' element={<CatalogPage isLoading={isLoading}/>} />
          <Route path='/favorites' element={<FavoritePage isLoading={isLoading} />} />
          <Route path='/faq' element={<FaqPage />}/>
          <Route path='/product/:productId' element={<ProductPage />}/> {/* :productID это переменная, значение задается в компоненте card <Link to={`/product/${_id}`} className="card__link">*/}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        
        
        
      </main>
      <Footer />
    </UserContext.Provider>
    </CardsContext.Provider>
    </ThemeContext.Provider>
  );
}


{/* <h1 style={headerStyle}>Стилизованный заголовок</h1>
<Button htmlType='button' type='primary'>Купить</Button>
<Button htmlType='button' type='secondary'>Отложить</Button>
<Button htmlType='button' type='secondary' extraClass={s.button} >extra class</Button> */}