import express from "express";
import {getUsers, createUsers, updateUsers, deleteUsers, getUsersById} from '../controller/UserController.js';
import {getPegawai, createPegawai, updatePegawai, deletePegawai, getPegawaiById} from '../controller/PegawaiController.js';

const router = express.Router();

router.get('/user', getUsers);
router.get('/user/:id', getUsersById);
router.post('/user', createUsers);
router.put('/user/:id', updateUsers);
router.delete('/user/:id', deleteUsers);

router.get('/pegawai', getPegawai);
router.get('/pegawai/:id', getPegawaiById);
router.post('/pegawai', createPegawai);
router.put('/pegawai/:id', updatePegawai);
router.delete('/pegawai/:id', deletePegawai);

export default router;