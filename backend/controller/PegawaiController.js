import Pegawai from "../models/PegawaiModel.js";
import path from "path";
import fs from "fs";

export const getPegawai = async(req, res)=>{
    try {
        const response = await Pegawai.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPegawaiById = async(req, res)=>{
    try {
        const response = await Pegawai.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createPegawai = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const nama = req.body.nama;
    const email = req.body.email;
    const alamat = req.body.alamat;
    const no_telp = req.body.no_telp;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 300000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Pegawai.create({nama: nama, gambar: fileName, url: url, email: email, alamat: alamat, no_telp: no_telp});
            res.status(201).json({msg: "Pegawai Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updatePegawai = async(req, res)=>{
    const pegawai = await Pegawai.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!pegawai) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = pegawai.gambar;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 300000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${pegawai.gambar}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const nama = req.body.nama;
    const email = req.body.email;
    const alamat = req.body.alamat;
    const no_telp = req.body.no_telp;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Pegawai.update({nama: nama, gambar: fileName, url: url, email: email, alamat: alamat, no_telp: no_telp},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Pegawai Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePegawai = async(req, res)=>{
    const pegawai = await Pegawai.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!pegawai) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${pegawai.gambar}`;
        fs.unlinkSync(filepath);
        await Pegawai.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Pegawai Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}