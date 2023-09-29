import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: {
    name: 'Guest',
    email: '',
    role: 'guest',
    avatar: '../assets/images/avatar_guest.png',
    team: 'none',
  },
  isLogged: false,
  login: (userData) => set({ user: userData, isLogged: true }),
  logout: () =>
    set({
      user: {
        name: 'Guest',
        email: '',
        role: 'guest',
        avatar: '../assets/images/avatar_guest.png',
        team: 'none',
      },
      isLogged: false,
    }),
}))

export { useAuthStore }
