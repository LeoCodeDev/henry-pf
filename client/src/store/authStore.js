import axios from 'axios'
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: {
    first_name: 'Guest',
    email: '',
    role: 'guest',
    avatar: '../assets/images/avatar_guest.png',
    team: 'none',
  },
  isLogged: false,
  login: (userData) => set({ user: userData, isLogged: true }),
  authenticate: async (credentials) => {
    try {
      const { data } = await axios.post('/login', credentials)
      const { first_name, email, role, avatar, team } = data
      if (data && first_name && email && role && avatar && team) {
        const userData = {
          first_name,
          email,
          role,
          avatar,
          team,
        }
        set({ user: userData, isLogged: true })
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  logout: () =>
    set({
      user: {
        first_name: 'Guest',
        email: '',
        role: 'guest',
        avatar: '../assets/images/avatar_guest.png',
        team: 'none',
      },
      isLogged: false,
    }),
}))

export { useAuthStore }
