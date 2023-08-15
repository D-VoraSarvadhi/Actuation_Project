import { Model, DataTypes } from 'sequelize';
import db from '../config/db';
import { notEmptyMessage } from '../middleware/responceHandle';
import User from './userModel';

interface itemsInterface extends Model {
    id: number,
    sellerID: number,
    itemName: string,
    Description: string,
    startBid: string,
    startTime: string,
    endTime: string,
    status: 'sold' | 'unsold' | 'active',
    avatar: string[]
}

const Items = db.define<itemsInterface>('Items', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  sellerID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: {
        msg: notEmptyMessage('Item Name')
      }
    }
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startBid: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: notEmptyMessage('Starting Bid')
      }
    }
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: notEmptyMessage('Start Time')
      }
    }
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: notEmptyMessage('End Time')
      }
    }
  },
  status: {
    type: DataTypes.ENUM,
    values: [ 'unsold', 'sold', 'active' ],
    defaultValue: 'unsold'
  },
  avatar: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  }
});

User.hasMany(Items, { foreignKey: 'sellerID' });

export default Items;