import db from "../db/db.js";
import { DataTypes } from "sequelize";
var Users = db.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});
var Contacts = db.define('contacts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
});
Users.hasMany(Contacts);
Contacts.belongsTo(Users, { foreignKey: { name: 'userId', allowNull: false } });
export default { Users: Users, Contacts: Contacts };
