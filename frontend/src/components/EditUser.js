import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditUser = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_telp, setNotelp] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:8000/user/${id}`);
    setNama(response.data.nama);
    setEmail(response.data.email);
    setAlamat(response.data.alamat);
    setNotelp(response.data.no_telp);
    setTanggalLahir(response.data.tanggal_lahir);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("alamat", alamat);
    formData.append("no_telp", no_telp);
    formData.append("tanggal_lahir", tanggal_lahir);
    try {
      await axios.put(`http://localhost:8000/user/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Alamat</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">No Telp</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={no_telp}
                onChange={(e) => setNotelp(e.target.value)}
                placeholder="No Telp"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Tanggal Lahir</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={tanggal_lahir}
                onChange={(e) => setNotelp(e.target.value)}
                placeholder="Tanggal Lahir"
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
          <Link to={`/user`} className='button is-info'>Back</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
