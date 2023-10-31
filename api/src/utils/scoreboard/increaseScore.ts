const Score = require('../score-js/lib/score')
const {User} = require('../../db_connection')

export const increaseScore = async (userId: number,exp: number) => {
    
    try {
        const user = await User.findByPk(userId)
        const newScore = new Score()
        newScore.set(user.score)
    
        newScore.increment(exp)
        if (newScore.scorecard().totalprogress === "100.00") newScore.prestige() //*Increase prestige if exp and LVL are MAX
    
        const newData = newScore.scorecard()
        user.update({score: newData}) //*Updating new Score Object in the user
    
        return user
    } catch (error: any) {
        return error
    }

}