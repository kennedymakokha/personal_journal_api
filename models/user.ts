import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './../database';

interface UsersAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface UsersCreationAttributes extends Optional<UsersAttributes, 'id'> { }

class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(1024),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(1024),
            allowNull: false,
        }
    },
    {
        tableName: 'users',
        sequelize, // passing the `sequelize` instance is required
    }
);

export default Users;