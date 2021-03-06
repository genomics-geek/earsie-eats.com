import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'

import 'react-quill/dist/quill.snow.css'
import 'semantic-ui-css/semantic.min.css'
import './index.css'


const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement)

if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default
    ReactDOM.render(<NextRoot />, rootElement)
  })
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
