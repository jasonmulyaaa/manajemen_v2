import {BrowserRouter, Routes, Route} from "react-router-dom";
import PegawaiList from "./components/PegawaiList";
import AddPegawai from "./components/AddPegawai";
import EditPegawai from "./components/EditPegawai";

import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pegawai" element={<PegawaiList/>}/>
        <Route path="/pegawai/add" element={<AddPegawai/>}/>
        <Route path="/pegawai/edit/:id" element={<EditPegawai/>}/>

        <Route path="/user" element={<UserList/>}/>
        <Route path="/user/add" element={<AddUser/>}/>
        <Route path="/user/edit/:id" element={<EditUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
