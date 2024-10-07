//TODO
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Router from './Router';
import reportWebVitals from './reportWebVitals';
import {IntlProvider} from 'react-intl'
import './common.scss'

import {en} from './lang/en.js'
import {fr} from './lang/fr.js'

const messages = {
  'en': en,
  'fr': fr,
}

const language = navigator.language.split(/[-_]/)[0]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <IntlProvider onError={()=>{}} locale={navigator.language} messages={messages[language]}>
      <Router />
    </IntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
