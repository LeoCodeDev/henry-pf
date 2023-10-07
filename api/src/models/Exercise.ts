import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';

export const ExerciseModel = (sequelize: Sequelize) => {
    sequelize.define('Exercise',{
        id_exercise:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },  
        type:{
            type: DataTypes.ENUM,
            values:[
            "cardio",
            "olympic_weightlifting",
            "plyometrics",
            "powerlifting",
            "strength",
            "stretching",
            "strongman"],
            allowNull: false
        },  
        muscle:{
            type: DataTypes.ENUM,
            values:[
            "abdominals",
            "abductors",
            "adductors",
            "biceps",
            "calves",
            "chest",
            "forearms",
            "glutes",
            "hamstrings",
            "lats",
            "lower_back",
            "middle_back",
            "neck",
            "quadriceps",
            "traps",
            "triceps",
            "shoulders",
        ],
            allowNull: false
        },
        difficulty:{
            type:DataTypes.ENUM,
            values:["beginner","intermediate","expert"]
        },
        description:{
            type:DataTypes.STRING(2500),
            allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{ timestamps: false })
}