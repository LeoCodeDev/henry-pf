require("dotenv").config();
import { Sequelize } from 'sequelize';
const {DB_DEPLOY,API_KEY_CLOUDINARY,API_SECRET_CLOUDINARY} = process.env;
import {ProductModel} from './models/Product';
import {CategoryModel} from './models/Category';
import {UserModel} from './models/User';
import {TeamModel} from './models/Team';
import cloudinary from 'cloudinary';


// const sequelize = new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DBB}`,
//     { logging: false, native: false }
// )

cloudinary.v2.config({
    cloud_name: 'healthtech',
    api_key: API_KEY_CLOUDINARY,
    api_secret: API_SECRET_CLOUDINARY,
    secure: true,
    });

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

Product.belongsToMany(User,{through: 'fav_users_products'})
User.belongsToMany(Product,{through: 'fav_users_products'})

module.exports = {
    Product,
    Category,
    User,
    Team,
    sequelize
}