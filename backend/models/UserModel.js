import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const User = db.define('user', {
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telp: DataTypes.INTEGER,
    tanggal_lahir: DataTypes.DATE,
}, {
    freezeTableName: true,
    timestamps: false
});

export default User;
