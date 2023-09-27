import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';

export const ProductModel = (sequelize: Sequelize) => {
    sequelize.define('Product',{
        id_product:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING(150),
            allowNull: false
        },
        price:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating:{
            type: DataTypes.FLOAT,
            allowNull:false
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{ timestamps: false })
}