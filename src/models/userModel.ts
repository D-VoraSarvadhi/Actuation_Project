import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db';
import { notEmptyMessage } from '../middleware/responceHandle';

interface userInretface extends Model {
  id: number
  name: string
  userName: string
  password: string
  email: string
  phone: string
  verify: boolean
  roles: 'User' | 'Seller'
}

const User = db.define<userInretface>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: notEmptyMessage('Name')
      }
    }
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: notEmptyMessage('Name')
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: [/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()_+{}]).{8,16}$/],
        msg: 'Password not follow the rules'
      },
      notEmpty: {
        msg: notEmptyMessage('Password')
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'SequelizeUniqueConstraintError',
      msg: 'Number is already register'
    },
    validate: {
      notEmpty: {
        msg: notEmptyMessage('Phone')
      },
      len: {
        args: [ 10,10 ],
        msg: 'Phone number is invalid'
      }
    }
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  roles: {
    type: DataTypes.ENUM,
    values: [ 'User', 'Seller' ],
    allowNull: false,
    validate: {
      notEmpty: {
        msg: notEmptyMessage('Roles')
      }
    }
  },
  avatar: {
    type: DataTypes.STRING
  }
});

User.afterValidate(async data => {
  data.password = await bcrypt.hashSync(data.password, 10);
});

export default User;