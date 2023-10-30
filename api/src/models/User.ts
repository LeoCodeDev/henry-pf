import DataTypes from 'sequelize';
import { Sequelize } from 'sequelize';
const Score = require('../utils/score-js/lib/score')

const score = new Score({persistant: false}).scorecard()

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
            values:["User","Trainer","Admin"],
            allowNull: false
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue: true
        },
        ip_location:{
            type:DataTypes.JSON,
            defaultValue: {
                currency: "USD",
                flag:"https://ipgeolocation.io/static/flags/us_64.png",
                countryName:"United States", 
                symbol:"$",
                currencyName:"US Dollar"},
            allowNull: false
        },
        score: {
            type: DataTypes.JSONB,
            defaultValue: score
        }
    },{ timestamps: true })
}

