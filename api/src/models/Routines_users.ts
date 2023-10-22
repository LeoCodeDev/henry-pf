import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";

export const RoutinesUserModel = (sequelize: Sequelize) => {
    sequelize.define('Routines_users',{
        date:{
            type: DataTypes.ARRAY(DataTypes.JSON)
        }
    })
}