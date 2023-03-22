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

//import s from './styles.module.css';


export function App() {
  const [cards, setCards] = useState([]); //стейт для карточек для рендеринга
  const [currentUser, setCurrentUser] = useState(null) //стейт для авторизованного пользователя
  const [searchQuery, setSearchQuery] = useState(''); //стейт для строки поиска
  const [value, setValue] = useState('');//стейт значение в инпуте строки
  
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
    api.changeLikeProductStatus(product._id, like)
      .then((updatedCard) => {
          const newProducts = cards.map(cardState => { //карточка в стейте cards
           return cardState._id === updatedCard._id? updatedCard : cardState
          })
          setCards(newProducts)
      })
  }

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])


  useEffect(() => {

    api.getAllInfo() //нужен чтобы запрос пользователя был вместе с продуктам, чтоб рендеринг был после определения пользователя
      .then(([userInfoData, productsData]) => {
        setCurrentUser(userInfoData); //асинхронная операция
        setCards(productsData.products) //асинхронная операция

        console.log(productsData);
        // console.log(state) (покажет старый стейт или null) сработает раньше чем //асинхронная операция выше
      })
      .catch(err => console.log(err))

    /* api.getProductList()
      .then(data => setCards(data.products))
      .catch(err => console.log(err))

    api.getUserInfo()
      .then(user => setCurrentUser(user))
      .catch(err => console.log(err)) */

  }, [])

  

  const headerStyle = {
    color: 'black',
    backgroundColor: 'yellow'
  }


  return (
    <>
      <Header user={currentUser} onUpdatedUser={handleUpdateUser}>
        <Logo />
        <Search handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} handleInputClear={handleInputClear} value={value} setValue={setValue} />
      </Header>
      <main className="content container">
        <Sort />
        <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
      </main>
      <Footer />
    </>
  );
}


{/* <h1 style={headerStyle}>Стилизованный заголовок</h1>
<Button htmlType='button' type='primary'>Купить</Button>
<Button htmlType='button' type='secondary'>Отложить</Button>
<Button htmlType='button' type='secondary' extraClass={s.button} >extra class</Button> */}