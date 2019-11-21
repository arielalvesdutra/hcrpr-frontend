import axios from 'axios'

const backendUrl = process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL
    : 'http://localhost'

const instance = axios.create({
  baseURL: backendUrl
})

export default instance
