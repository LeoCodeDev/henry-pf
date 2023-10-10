import axios from 'axios'
import { create } from 'zustand'

const userGuest = {
  username: '?',
  email: '',
  role: 'guest',
  avatar: '../assets/images/avatars/avatar10.jpg',
  teamName: 'none',
  ip_location:{
    currency: "USD",
    flag:"https://ipgeolocation.io/static/flags/us_64.png",
    countryName:"United States", 
    symbol:"$",
    currencyName:"US Dollar"}
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
      const { data } = await axios.post('/login', credentials,
      { withCredentials: true }
      )
      const { id_user,username, email, role, avatar, teamName, access, ip_location } = data
      if (data && username && email && role && avatar && teamName) {
        const userData = {
          id_user,
          username,
          email,
          role,
          avatar,
          teamName,
          ip_location
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

  logout: async() => {
    const currentUser= useAuthStore.getState().user
    set({
      user: userGuest,
      isLogged: false
    })
    if(currentUser.role!='guest'){
    try {
      await axios.delete(`/deleteToken?id_user=${currentUser.id_user}`,
      {
        withCredentials: true}
      )
    } catch (error) {
      console.log(error)
    }}
    // Elimina el estado de Local Storage al cerrar sesión
    localStorage.removeItem('authState')
  }
}))

export { useAuthStore }
