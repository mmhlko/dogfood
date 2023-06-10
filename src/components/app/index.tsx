//Компоненты и страницы
import MainPage from '../../pages/main-page';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import { FavoritePage } from '../../pages/favorite-page';
import NotFoundPage from '../../pages/not-found-page';
import FaqPage from '../../pages/faq';
import Modal from '../modal';
import RegisterForm from '../register-form';
import LoginForm from '../login-form';
import ProtectedRoute from '../protected-route';
import ResetPasswordForm from '../reset-password-form';
import { Logo } from '../logo';
import { Search } from '../search';
import { Footer } from '../footer';
import { Header } from '../header';

//hooks
import { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';

//utils
import { getLocalData } from '../../utils/local-storage';
import api, { UserAuthBodyDto, UserRegisterBodyDto } from '../../utils/api'
import {UserBodyDto} from '../../utils/api'

import { TABS, TABS_ID } from '../../utils/constants';
import { isLiked } from '../../utils/products';

//контекст
import { UserContext } from '../../contexts/current-user-context';
import { ThemeContext, themes } from '../../contexts/theme-context';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeLikeProduct, fetchProducts, sortedProducts } from '../../storage/products/products-slice';
import { fetchCheckToken, fetchLoginUser, fetchRegisterUser } from '../../storage/user/user-slice';
import DnDPage from '../../pages/dnd-page';
import CartPage from '../../pages/cart-page';
import { useAppDispatch, useAppSelector } from '../../storage/hook';
import { SubmitHandler } from 'react-hook-form';
import ProfilePage from '../../pages/profile-page';
import ProfileInfo from '../profile-info';
import ProfileForm from '../profile-form';


export function App() {
  // redux replace // const [cards, setCards] = useState([]); //стейт для карточек для рендеринга
  
  const [defaultCards, setDefaultCards] = useState([]);
  // redux replace //const [favorites, setFavorites] = useState([]);
  const [currentSort, setCurrentSort] = useState(TABS_ID.DEFAULT);
  // redux replace // const [currentUser, setCurrentUser] = useState(null) //стейт для авторизованного пользователя
  const [searchQuery, setSearchQuery] = useState(''); //стейт для строки поиска
  const [value, setValue] = useState('');//стейт значение в инпуте строки
  // redux replace // const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState(themes.light);
  const debounceSearchQuery = useDebounce(searchQuery, 300)

  //redux replace
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.data)
  const cards = useAppSelector(state => state.products.data)
  // [header] const favorites = useSelector(state => state.products.favoriteProducts)
  //const currentSort = useSelector(state => state.)
  
  const isLoadingProducts = useAppSelector(state => state.products.loading)
  const isLoading = /* isLoadingUser && */ isLoadingProducts; //сохраняем старую переменную которая теерь состоит из сочетания двух
  
  
  //routing + modal
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;
  const navigate = useNavigate()

//закрытие модального окна ведет на страницу открытия модального окна или на главную
  const onCloseRoutingModal = () => {
    navigate(initialPath || '/', {replace: true}) //вторым полем удаляем из истории переход обратно
  }

  function handleInputClear(e: SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    setValue('');
    setSearchQuery('');
    //setCards(dataCard)

  }

  function handleRequest() {

    /*     const filterCards = dataCard.filter(item => 
          item.name.includes(searchQuery))
    
        setCards(filterCards) */

    api.search(debounceSearchQuery)
      .then((dataSearch) => {
        //setCards(dataSearch)

      })

  }

  function handleInputChange(dataInput:string) {
    setSearchQuery(dataInput)
  }

  function handleFormSubmit(evnt:FormEvent<HTMLFormElement>) {
    evnt.preventDefault();    
    handleRequest();
  }

  function handleUpdateUser(dataUserUpdate :UserBodyDto) {
    api.setUserInfo(dataUserUpdate)
      .then((updatedUser) => {
        //setCurrentUser(updatedUser)
      })
  }

 

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])

  //redux

  const token = getLocalData('token')
  

  useEffect(() => { //когда 2 диспатча идут друг за другом, она асинхронные и возвращаются данные кто вперед, если сделать через then то они выполняются по очереди
    dispatch(fetchCheckToken(token)) //диспатч возвращает промис, поэтому можно применить then
      .then(() => {
        if (token) {        
          dispatch(fetchProducts())
        }
       
      })   
    
  }, [dispatch, token])


  function toggleTheme() {
    theme === themes.dark? setTheme(themes.light) : setTheme(themes.dark)
  }

/* //callback для отправки формы логина и регистрации
  const handleSubmitForm = (dataForm) => {
    console.log(dataForm);        
} */


/* //Переход на страницу  авторизации
const handleClickNavigateLogin = (e) => {
  e.preventDefault();
  //так же как для <Link to='/register' replace state={{backgroundLocation: {...location, state: null}, initialPath}>
  navigate('/login', {replace: true, state: {backgroundLocation: {...location, state: null}, initialPath}})
}
 */

const cbSubmitFormRegister: SubmitHandler<UserRegisterBodyDto> = (dataForm) => {
  //console.log('cbSubmitFormLoginRegister', dataForm);
  dispatch(fetchRegisterUser(dataForm))
}
const cbSubmitFormLogin: SubmitHandler<UserAuthBodyDto> = (dataForm) => {
  //console.log('cbSubmitFormLogin', dataForm);
  dispatch(fetchLoginUser(dataForm))
}
const cbSubmitFormResetPassword = (dataForm:any) => {
  //console.log('cbSubmitFormResetPassword', dataForm);
}

// в navigate отправляем только ссылку для перехода, без подложки
const handleClickNavigate = (to: string) => {  
  //navigate(to)
  return  (e: SyntheticEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      //так же как для <Link to='/register' replace state={{backgroundLocation: {...location, state: null}, initialPath}>
       navigate(to)
          
    }  
}


//добавляем подложку под модалку backgroundLocation и удаляем переход из истории
const handleClickNavigateModal = (to: string) => {  
  navigate(to, {replace: true, state: {backgroundLocation: {...location, state: null}, initialPath}})
/*   return  (e: SyntheticEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      //так же как для <Link to='/register' replace state={{backgroundLocation: {...location, state: null}, initialPath}>
       navigate(to, {replace: true, state: {backgroundLocation: {...location, state: null}, initialPath}})
          
    } */  
}
  

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <Header>        
        <Routes location={backgroundLocation && {...backgroundLocation, pathname: initialPath} || location}>
          <Route path='/' element={<><Logo href='/' /></>}/>
          <Route path='/catalog' element={
            <>
              <Logo href='/' />          
              <Search handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} handleInputClear={handleInputClear} /* value={value} setValue={setValue} */ />
            </>
          }/>
          <Route path='/profile' element={<><Logo href='/' /></>}/>
          <Route path='/login' element={<><Logo href='/' /></>}/>
          <Route path='/register' element={<><Logo href='/' /></>}/>
          <Route path='/reset-password' element={<><Logo href='/' /></>}/>
          <Route path='/product/:productId' element={<><Logo href='/' /></>} />
          <Route path='/dnd' element={<><Logo href='/' /></>} />
          <Route path='/user' element={<><Logo href='/' /></>} />
          <Route path='*' element={null} />
        </Routes>

        
      </Header>
      <main className="main" style={{backgroundColor: theme.background, color: theme.color}}>
        <Routes location={backgroundLocation && {...backgroundLocation, pathname: initialPath} || location}>
          {/* <Route path='/' element={<span>Главная</span>}/> */}
          <Route path='/' element={<MainPage/>} />
          <Route path='/catalog' element={<ProtectedRoute><CatalogPage/></ProtectedRoute>} />
          <Route path='/profile' element={
            <ProtectedRoute><ProfilePage/></ProtectedRoute>}>
              <Route index element={<ProfileInfo/>}/>
              <Route path='edit' element={<ProfileForm/>}/>          
          </Route>
          <Route path='/favorites' element={<ProtectedRoute><FavoritePage /></ProtectedRoute>} />
          <Route path='/faq' element={<FaqPage />}/>
          <Route path='/product/:productId' element={<ProtectedRoute><ProductPage /></ProtectedRoute>}/> {/* :productID это переменная, значение задается в компоненте card <Link to={`/product/${_id}`} className="card__link">*/}
          <Route path='/cart' element={<ProtectedRoute><CartPage /></ProtectedRoute>}/>
          <Route path='/user' element={<></>} />
          <Route path='/register' element={            
              <ProtectedRoute onlyUnAuth><RegisterForm onSubmit={cbSubmitFormRegister} onNavigate={handleClickNavigate}/></ProtectedRoute>
          }/>
          <Route path='/login' element={
              <ProtectedRoute onlyUnAuth><LoginForm onSubmit={cbSubmitFormLogin} onNavigate={handleClickNavigate}/></ProtectedRoute>
          }/>
          <Route path='/reset-password' element={
              <ProtectedRoute onlyUnAuth><ResetPasswordForm onSubmit={cbSubmitFormResetPassword} onNavigate={handleClickNavigate}/></ProtectedRoute>
          }/>
          <Route path='/dnd' element={<ProtectedRoute><DnDPage /></ProtectedRoute>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>     
        
        
      </main>
      <Footer />
      {backgroundLocation && <Routes>     
        <Route path='/register' element={
            <ProtectedRoute onlyUnAuth>
            <Modal isOpen={true} onClose={onCloseRoutingModal} >
              <RegisterForm onSubmit={cbSubmitFormRegister} onNavigate={handleClickNavigateModal} /* modal={true} *//>
            </Modal>
            </ProtectedRoute>
          }/>
                   
          
            <Route path='/login' element={
              <ProtectedRoute onlyUnAuth>
                <Modal isOpen={true} onClose={onCloseRoutingModal} >
                  <LoginForm onSubmit={cbSubmitFormLogin} onNavigate={handleClickNavigateModal} /* modal={true} *//>
                </Modal>
              </ProtectedRoute>
            }/>
          
          
            <Route path='/reset-password' element={
              <ProtectedRoute onlyUnAuth>
                <Modal isOpen={true} onClose={onCloseRoutingModal} >
                  <ResetPasswordForm onSubmit={cbSubmitFormResetPassword} onNavigate={handleClickNavigateModal} /* modal={true} *//>
                </Modal>
              </ProtectedRoute>
            }/>
          <Route path='/dnd' element={<ProtectedRoute><Modal isOpen={true} onClose={onCloseRoutingModal} ><DnDPage /></Modal></ProtectedRoute>} />
          <Route path='*' element={null} />
      </Routes>
      }
    </ThemeContext.Provider>
  );
}


{/* <h1 style={headerStyle}>Стилизованный заголовок</h1>
<Button htmlType='button' type='primary'>Купить</Button>
<Button htmlType='button' type='secondary'>Отложить</Button>
<Button htmlType='button' type='secondary' extraClass={s.button} >extra class</Button> */}