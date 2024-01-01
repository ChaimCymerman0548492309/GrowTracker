import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/connections.db';

export const AdminUser = sequelize.define('admin_users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(100), // Adjust the length as needed
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(200),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20), // Adjust the length as needed
    allowNull: false, // Set to true if phone number is optional
  },
  company: {
    type: DataTypes.STRING(100), // Adjust the length as needed
    allowNull: true, // Set to true if company is optional
  },
  address: {
    type: DataTypes.STRING(200), // Adjust the length as needed
    allowNull: true, // Set to true if address is optional
  },
  city: {
    type: DataTypes.STRING(100), // Adjust the length as needed
    allowNull: true, // Set to true if city is optional
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Assuming the user is public by default, you can adjust as needed
  },
}, {
  timestamps: false,
});
