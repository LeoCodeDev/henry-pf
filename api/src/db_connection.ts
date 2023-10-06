require("dotenv").config();
import { Sequelize } from 'sequelize';
const {DB_DEPLOY,API_KEY_CLOUDINARY,API_SECRET_CLOUDINARY} = process.env;
import {ProductModel} from './models/Product';
import {CategoryModel} from './models/Category';
import {UserModel} from './models/User';
import {TeamModel} from './models/Team';
import { ExcerciseModel } from './models/Excercise';
import { RoutineModel } from './models/Routine';
import { SaleModel } from './models/Sale';

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'healtech', 
  api_key: API_KEY_CLOUDINARY, 
  api_secret: API_SECRET_CLOUDINARY 
});
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
ExcerciseModel(sequelize)
RoutineModel(sequelize)
SaleModel(sequelize)

const { Product,Category,User,Team,Excercise,Routine,Sale} = sequelize.models

Product.belongsTo(Category)
Category.hasMany(Product)

User.belongsTo(Team)
Team.hasMany(User)

Product.belongsToMany(User,{through: 'fav_users_products'})
User.belongsToMany(Product,{through: 'fav_users_products'})

Excercise.belongsToMany(Routine,{through: 'routines_excercises'})
Routine.belongsToMany(Excercise,{through: 'routines_excercises'})

Routine.belongsToMany(User,{through: 'routines_users'})
User.belongsToMany(Routine,{through: 'routines_users'})

//Falta la relacion users_products
// pero no se muy bien como establecerla 
// o si deberia ser products_sales. 
Sale.belongsTo(User)
User.hasMany(Sale)

module.exports = {
    Product,
    Category,
    User,
    Team,
    Excercise,
    Routine,
    Sale,
    sequelize
}