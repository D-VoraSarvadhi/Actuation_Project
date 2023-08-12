import { Model, DataTypes } from 'sequelize';
import db from '../config/db';
import { notEmptyMessage } from '../middleware/responceHandle';

interface userInretface extends Model {
  id: number,
  userName: string,
  password: string,
  email: string
}

const User = db.define<userInretface>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: notEmptyMessage('Username')
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please enter valid email'
      },
      notEmpty: {
        msg: notEmptyMessage('Email')
      }
    }
  },
  passWord: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: notEmptyMessage('Password')
      }
    }
  }
});

export default User;