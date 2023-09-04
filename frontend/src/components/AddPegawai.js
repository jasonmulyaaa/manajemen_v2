import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddPegawai = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_telp, setNotelp] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const savePegawai = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("alamat", alamat);
    formData.append("no_telp", no_telp);
    formData.append("file", file);
    try {
      await axios.post("http://localhost:8000/pegawai", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/pegawai");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={savePegawai}>
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
            <label className="label">Image (JPG/JPEG, max: 300kb)</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
          <Link to={`/pegawai`} className='button is-info'>Back</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPegawai;
