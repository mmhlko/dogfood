import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './index.css';
import { App } from './components/app';

import './style.css';
import { Provider } from 'react-redux'; //подключаем store на все приложение
import store, { persistor } from './storage/store'; //сам стор
import { PersistGate } from 'redux-persist/integration/react';



const root = ReactDOM.createRoot(document.getElementById('root'));
//определение роутера в зависимости от того где запускается сборка
const Router = process.env.REACT_APP_GH_PAGES !== 'true' ? BrowserRouter : HashRouter;
//process.env переменная окружения - переменная с которой запускается приложение
//HashRouter нужен для навигации при публикации на гитхабе, т.к. там недоступен BrowserRouter
//для этого в package.json добавили строчку в скриптах "deploy-gh": "cross-env REACT_APP_GH_PAGES=true npm run build && gh-pages -d build"
//так же "homepage": "./", чтоб навигация была относительно папки где расположен index.html а не корень репа


root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

