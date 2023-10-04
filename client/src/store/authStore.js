import axios from 'axios'
import { create } from 'zustand'

const userGuest = {
  username: '?',
  email: '',
  role: 'guest',
  avatar: '../assets/images/avatars/avatar10.jpg',
  teamName: 'none'
}

const initialState = {
  user: userGuest,
  isLogged: false
}

// Intenta cargar el estado desde Local Storage si existe
const storedState = JSON.parse(localStorage.getItem('authState'))
const initialStateWithStorage = storedState
  ? { ...initialState, ...storedState }
  : initialState

const useAuthStore = create((set) => ({
  ...initialStateWithStorage,

  login: (userData) => {
    set({ user: userData, isLogged: true })
    // Guarda el estado actual en Local Storage
    localStorage.setItem(
      'authState',
      JSON.stringify({ user: userData, isLogged: true })
    )
  },

  authenticate: async (credentials) => {
    try {
      const { data } = await axios.post('/login', credentials)
      const { username, email, role, avatar, teamName, access } = data
      if (data && username && email && role && avatar && teamName) {
        const userData = {
          username,
          email,
          role,
          avatar,
          teamName
        }
        set({ user: userData, isLogged: access })
        // Guarda el estado actual en Local Storage
        localStorage.setItem(
          'authState',
          JSON.stringify({ user: userData, isLogged: access })
        )
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  logout: () => {
    set({
      user: userGuest,
      isLogged: false
    })
    // Elimina el estado de Local Storage al cerrar sesión
    localStorage.removeItem('authState')
  }
}))

export { useAuthStore }
