require("dotenv").config();
import { Sequelize } from 'sequelize';
const {DBB,DB_USER,DB_PASSWORD,DB_HOST} = process.env;
import {ProductModel} from './models/Product';
import {CategoryModel} from './models/Category';
import {UserModel} from './models/User';
import {TeamModel} from './models/Team';


const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DBB}`,
    { logging: false, native: false }
)

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