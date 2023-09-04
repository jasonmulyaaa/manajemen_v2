import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddUser = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_telp, setNotelp] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("alamat", alamat);
    formData.append("no_telp", no_telp);
    formData.append("tanggal_lahir", tanggal_lahir);
    try {
      await axios.post("http://localhost:8000/user", formData, {
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
        <form onSubmit={saveUser}>
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
                type="email"
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
                type="number"
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
                onChange={(e) => setTanggalLahir(e.target.value)}
                placeholder="Tanggal Lahir"
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
          <Link to={`/user`} className='button is-info'>Back</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
