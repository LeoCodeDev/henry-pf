import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';

export const TeamModel = (sequelize: Sequelize) => {
    sequelize.define('Team',{
        id_team:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        }
    },{ timestamps: false })
}