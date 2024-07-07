import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface CategoriesAttributes {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface CategoriesCreationAttributes extends Optional<CategoriesAttributes, 'id'> { }

class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> implements CategoriesAttributes {
    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Categories.init(
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

    },
    {
        tableName: 'categories',
        sequelize, // passing the `sequelize` instance is required
    }
);

export default Categories;