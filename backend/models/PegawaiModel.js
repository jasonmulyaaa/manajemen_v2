import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Pegawai = db.define('pegawai', {
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telp: DataTypes.INTEGER,
    gambar: DataTypes.STRING,
    url: DataTypes.STRING,
}, {
    freezeTableName: true,
    timestamps: false
});

export default Pegawai;
