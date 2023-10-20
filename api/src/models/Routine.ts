import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';

export const RoutineModel = (sequelize: Sequelize) => {
    sequelize.define('Routine',{
        id_routine:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name_routine:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        author:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        puntuation:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{ timestamps: false })}