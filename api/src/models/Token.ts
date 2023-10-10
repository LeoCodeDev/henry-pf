import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';

export const TokenModel = (sequelize: Sequelize) => {
    sequelize.define('RefreshToken',{
        token:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expiresAt:{
            type: DataTypes.DATE,
            allowNull: false,
        }
    },{ timestamps: false })}