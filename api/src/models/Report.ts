import DataTypes, { Sequelize } from 'sequelize';

export const ReportModel = (sequelize: Sequelize) =>{
    sequelize.define('Report', {
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reportType: {
      type: DataTypes.ENUM('User', 'Comment','Product')
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    checkedStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
    
  },{ timestamps: false });
} 