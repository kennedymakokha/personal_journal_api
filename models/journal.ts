import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './../database';

interface JournalAttributes {
    id: number;
    title: string;
    content: string;
    category: string;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    date?: Date;


}
interface JournalCreationAttributes extends Optional<JournalAttributes, 'id'> { }

class Journal extends Model<JournalAttributes, JournalCreationAttributes> implements JournalAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public category!: string;
    public createdBy!: string;
    public date!: Date;
    public deletedAt!: Date;


    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Journal.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        content: {
            type: new DataTypes.STRING(1024),
            allowNull: false,
        },
        category: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        createdBy: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        deletedAt: {
            type: new DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        tableName: 'journals',
        sequelize, // passing the `sequelize` instance is required
    }
);

export default Journal;