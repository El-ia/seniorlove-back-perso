import { Model, DataTypes } from "sequelize";
import { sequelize } from './client.js';

export class Label extends Model{};

Label.init({
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'label'
});