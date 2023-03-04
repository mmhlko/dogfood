import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app';
import { Card } from './components/card';
import { CardList } from './components/card-list';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Search } from './components/search';
import { Logo } from './components/logo';
import './style.css';

/*
import logoImage from './img/ReactLogo.png';  //в переменную копирется не изображение а путь к нему
import { ReactComponent as Logo } from './img/logo.svg'; //импортируется как элемент с картинкой

 const AppList = () => {
  const items = ['Первый элемент', 'Второй элемент', 'Третий элемент']
  const firstItem = <li>Пункт 1</li>
  const isAuth = true;
  return (
    <>
      <ul>
          {items.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
      </ul>
    </>
  )
}

//const elem = React.createElement('h1', null, 'Hello, World!')

const AppInput = ({placeholder, label}) => {
  
  
  return (
    <label className='label'>
      {label}
      <input placeholder={placeholder} type='password' />
    </label>
    
  )
}

const AppHeader = ({title, children}) => {
  console.log({title, children});
 return (
  <div>
    <img className='image' src={logoImage}/>
    <Logo/>
    {title && <h1 className='header-title'>{title}</h1>}
    {children}
    
  </div>
 )
}

const App = () => {
  return (
    <>
      <AppHeader title='Hello world'>
        <p>children</p>
        
      </AppHeader>
      <AppList />
      <AppInput placeholder='Введите имя' label='Имя'/>
      <AppInput placeholder='Введите email' label='Email'/>
           
    </>
  )
} */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

