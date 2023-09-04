import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get("http://localhost:8000/user");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/user/${userId}`);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <Link to={`add`} className='button is-success'>Add New</Link>
            <Link to={`../pegawai`} className='button is-info'>Pegawai</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Alamat</th>
                        <th>No Telp</th>
                        <th>Tanggal Lahir</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.nama}</td>
                    <td>{user.email}</td>
                    <td>{user.alamat}</td>
                    <td>{user.no_telp}</td>
                    <td>{user.tanggal_lahir}</td>
                    <td>
                        <Link to={`edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                        <button onClick={() => deleteUser(user.id)} className='button is-small is-danger'>Delete</button>
                    </td>
                </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default UserList;
