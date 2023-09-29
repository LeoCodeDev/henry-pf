import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';

export const CategoryModel = (sequelize: Sequelize) => {
    sequelize.define('Category',{
        id_category:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },       
        variants:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
    },{ timestamps: false })
}