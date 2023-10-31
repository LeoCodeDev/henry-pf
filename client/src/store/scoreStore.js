import { create } from 'zustand'
import axios from 'axios'

const scoreStore = create((set) => ({
  scoreCard: {},
  topPlayers: [],
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
  fetchTopPlayers: async () => {
    try {
      const { data } = await axios(`/scoreboard/getTopScores`)
      set({ topPlayers: data })
    } catch (error) {
      throw new Error(error.message)
    }
  },
  
}))

export { scoreStore }
