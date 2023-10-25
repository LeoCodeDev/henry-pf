import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";


export const TrainersUserModel = (sequelize: Sequelize) => {
    sequelize.define('Trainers_users',{
        rating:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        comment:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        date:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW 
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {timestamps: false})
}