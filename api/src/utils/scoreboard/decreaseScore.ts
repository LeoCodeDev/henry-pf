const Score = require('../score-js/lib/score')
const {User} = require('../../db_connection')

export const decreaseScore = async (userId: number,exp: number) => {
    
    try {
        const user = await User.findByPk(userId)
        
        const newScore = new Score()
        newScore.set(user.score) //*
    
        newScore.decrement(exp)

        const newData = newScore.scorecard()
        user.update({score: newData}) //*Updating new Score Object in the user
    
        return user
    } catch (error: any) {
        return error
    }

}