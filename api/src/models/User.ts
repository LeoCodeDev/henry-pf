import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';

export const UserModel = (sequelize: Sequelize) => {
    sequelize.define('User',{
        id_user:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        first_name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        avatar:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(150),
            allowNull: false
        },
        birth_date:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        role:{
            type: DataTypes.ENUM,
            values:["User","Trainer"],
            allowNull: false
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{ timestamps: false })
}