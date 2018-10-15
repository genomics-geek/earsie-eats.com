import axios from 'axios'


export const api = axios.create({
  timeout: 10000,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
})
