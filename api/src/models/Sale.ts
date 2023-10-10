import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';

export const SaleModel = (sequelize: Sequelize) => {
    sequelize.define('Sale',{
        id_sale:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        date:{
            type:DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },       
        total:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        address:{
            type:DataTypes.STRING,
            allowNull: false,   
        },
        phone_number:{
            type:DataTypes.STRING,
            allowNull: false,
        }
    },{ timestamps: false })}