require("dotenv").config();
import { Sequelize } from 'sequelize';
const {DB_DEPLOY,API_KEY_CLOUDINARY,API_SECRET_CLOUDINARY} = process.env;
import {ProductModel} from './models/Product';
import {CategoryModel} from './models/Category';
import {UserModel} from './models/User';
import {TeamModel} from './models/Team';
import { ExerciseModel } from './models/Exercise';
import { RoutineModel } from './models/Routine';
import { SaleModel } from './models/Sale';
import { TokenModel } from './models/Token';
import { CouponModel } from './models/Coupon';
import {v2 as cloudinary} from 'cloudinary';
import { RatingModel } from './models/Rating';
import { ReportModel } from './models/Report';
import { RoutinesUserModel } from './models/Routines_users';
import { TrainersUserModel } from './models/Trainers_users';




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
ExerciseModel(sequelize)
RoutineModel(sequelize)
SaleModel(sequelize)
TokenModel(sequelize)
CouponModel(sequelize)
RatingModel(sequelize)
ReportModel(sequelize)
RoutinesUserModel(sequelize)
TrainersUserModel(sequelize)

const { Product,Category,User,Team,Exercise,Routine,Sale,RefreshToken,Coupon,Rating, Report, Routines_users, Trainers_users} = sequelize.models

Product.belongsTo(Category)
Category.hasMany(Product)

User.belongsTo(Team)
Team.hasMany(User)

Product.belongsToMany(User,{through: 'fav_users_products'})
User.belongsToMany(Product,{through: 'fav_users_products'})

Exercise.belongsToMany(Routine,{through: 'routines_exercises'})
Routine.belongsToMany(Exercise,{through: 'routines_exercises'})
Routine.belongsTo(User,{foreignKey:'userAuthor' ,as:'user_author'})

Routine.belongsToMany(User,{through: Routines_users})
User.belongsToMany(Routine,{through: Routines_users})

Sale.belongsTo(User)
User.hasMany(Sale)

Product.belongsToMany(Sale,{through: 'sales_products'})
Sale.belongsToMany(Product,{through: 'sales_products'})

User.hasMany(RefreshToken, { onDelete: 'CASCADE' });
RefreshToken.belongsTo(User);

User.belongsToMany(Coupon,{through: 'cupons_users'})
Coupon.belongsToMany(User,{through: 'cupons_users'})

Rating.belongsTo(User, { foreignKey: 'userId' }); // Un Rating pertenece a un User
Rating.belongsTo(Product, { foreignKey: 'productId' }); // Un Rating pertenece a un Product


Report.belongsTo(User, { as: 'reporterUser', foreignKey: 'reporterId'})
Report.belongsTo(User, { as: 'reportedUser', foreignKey: 'reportedIdUser', });
Report.belongsTo(Rating, { as: 'reportedComment',foreignKey: 'reportedIdComment', });
Report.belongsTo(Product, { as: 'reportedProduct', foreignKey: 'reportedIdProduct', });

//User.belongsToMany(User,{as:'trainer_user',through: Trainers_users, foreignKey: "trainer_id"})
Trainers_users.belongsTo(User,{as:'TrainerRated',foreignKey: "trainer_id"})
Trainers_users.belongsTo(User,{as:'UserRater', foreignKey: "user_id"})

module.exports = {
    Product,
    Category,
    User,
    Team,
    Exercise,
    Routine,
    Sale,
    RefreshToken,
    Coupon,
    Rating,
    Report,
    Routines_users,
    Trainers_users,
    sequelize
}