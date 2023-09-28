require("dotenv").config();
import { Sequelize } from 'sequelize';
const {DB_DEPLOY} = process.env;
import {ProductModel} from './models/Product';
import {CategoryModel} from './models/Category';
import {UserModel} from './models/User';
import {TeamModel} from './models/Team';


// const sequelize = new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DBB}`,
//     { logging: false, native: false }
// )
if(!DB_DEPLOY){
    throw new Error("DB_DEPLOY is not defined")

}
const sequelize = new Sequelize(DB_DEPLOY, 
    {logging: false, native: false,
        dialectOptions:{
        ssl:{
        require:true
        }
    }})


ProductModel(sequelize)
CategoryModel(sequelize)
UserModel(sequelize)
TeamModel(sequelize)

const { Product,Category,User,Team} = sequelize.models

Product.belongsTo(Category)
Category.hasMany(Product)

User.belongsTo(Team)
Team.hasMany(User)

module.exports = {
    Product,
    Category,
    User,
    Team,
    sequelize
}