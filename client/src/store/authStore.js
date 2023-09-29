import axios from 'axios'
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: {
    username: 'Guest',
    email: '',
    role: 'guest',
    avatar: '../assets/images/avatars/avatar10.jpg',
    teamName: 'none',
  },
  isLogged: false,
  login: (userData) => set({ user: userData, isLogged: true }),
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
          teamName,
        }
        set({ user: userData, isLogged: access })
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
        username: 'Guest',
        email: '',
        role: 'guest',
        avatar: '../assets/images/avatars/avatar10.jpg',
        teamName: 'none',
      },
      isLogged: false,
    }),
}))

export { useAuthStore }
