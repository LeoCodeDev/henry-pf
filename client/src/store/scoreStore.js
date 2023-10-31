import { create } from 'zustand'
import axios from 'axios'

const scoreStore = create((set) => ({
  scoreCard: {},
  fetchScoreCard: async (username) => {
    try {
      const { data } = await axios(
        `/scoreboard/getUserScores?username=${username}`
      )
      set({ scoreCard: data })
    } catch (error) {
      set({
        scoreCard: {
          username: 'Guest',
          level: '100',
          lvlName: 'None',
          quote: 'Hey, you must register and compile that muscle',
          currentExp: 5000,
          totalExp: 5000,
          nextlvlExp: 0,
          progress: '100.00',
          achievement: [],
          prestige: 10,
        },
      })
    }
  },
  
}))

export { scoreStore }