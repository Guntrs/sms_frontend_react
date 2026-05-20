import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export const loginUser = (email, password) => {
  return api.post('/login', { email, password })
}

export const logoutUser = () => {
  localStorage.removeItem('token')
}

export const getCurrentUser = () => {
  const token = localStorage.getItem('token')
  return token ? JSON.parse(atob(token.split('.')[1])) : null
}

export default api
