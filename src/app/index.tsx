import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApiProvider } from '../api';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider
      url="https://jean-test-api.herokuapp.com/"
      token="196bbd02-0c8d-4b65-b06c-863d55b4a188" // set your api token here
    >
      <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
