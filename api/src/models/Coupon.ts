import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';

export const CouponModel = (sequelize: Sequelize) => {
    sequelize.define('Coupon',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {timestamps:false})}
