import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PegawaiList = () => {
  const [pegawais, setPegawais] = useState([]);

  useEffect(() => {
    getPegawai();
  }, []);

  const getPegawai = async () => {
    const response = await axios.get("http://localhost:8000/pegawai");
    setPegawais(response.data);
  };

  const deletePegawai = async (pegawaiId) => {
    try {
      await axios.delete(`http://localhost:8000/pegawai/${pegawaiId}`);
      getPegawai();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <Link to={`add`} className='button is-success'>Add New</Link>
            <Link to={`../user`} className='button is-info'>User</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Alamat</th>
                        <th>No Telp</th>
                        <th>Gambar</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pegawais.map((pegawai, index) => (
                <tr key={pegawai.id}>
                    <td>{index + 1}</td>
                    <td>{pegawai.nama}</td>
                    <td>{pegawai.email}</td>
                    <td>{pegawai.alamat}</td>
                    <td>{pegawai.no_telp}</td>
                    <td><img src={pegawai.url} alt="Image" width={80} height={40}/></td>
                    <td>
                        <Link to={`edit/${pegawai.id}`} className='button is-small is-info'>Edit</Link>
                        <button onClick={() => deletePegawai(pegawai.id)} className='button is-small is-danger'>Delete</button>
                    </td>
                </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default PegawaiList;
