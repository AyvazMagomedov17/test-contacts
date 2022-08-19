import { IContacts } from './../interfaces/IContacts.js';
import { IUsers } from './../interfaces/IUsers.js';
import db from "../db/db.js";
import { DataTypes, Model } from "sequelize";

const Users = db.define<Model<IUsers>>('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
})

const Contacts = db.define<Model<IContacts>>('contacts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
})


Users.hasMany(Contacts)
Contacts.belongsTo(Users, { foreignKey: { name: 'userId', allowNull: false } })


export default { Users, Contacts }

