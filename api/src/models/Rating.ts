import DataTypes, { Sequelize } from 'sequelize';

export const RatingModel = (sequelize: Sequelize) =>{
    sequelize.define('Rating', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
} 
