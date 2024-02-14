import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import AddNote from './pages/AddNote/AddNote';
import Logout from './pages/Logout/Logout'
import Update from './pages/Update/Update';
import Error from './pages/Error/Error';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/addnote" element={<AddNote />} />
          <Route path="/edit/:id" element={<Update />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App