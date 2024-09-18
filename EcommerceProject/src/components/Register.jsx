import { useState } from "react";
import { useRegisterMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";
import pickleavi from "../img/Pickle-Avi.jpg";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../styles/Home.css';
import ItemDetail from "./ItemDetail";


function Register({ setToken }) {
  const initialForm = {
    username: "",
    password: "",
  };

  const [form, updateForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [register] = useRegisterMutation();


  const Navigate = useNavigate ()

  const handleChange = ({ target }) => {
    setError(null);
    updateForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (form.username === "" || form.password === "") {
      setError("Please provide a username and password");
      return;
    }

    const { data, error } = await register(form);

    if (error) {
      setError(error);
      return;
    }

    setToken(data.token);
    Navigate ("/items");
  };


  const { username, password } = form;

  return (
    <div><br></br>
      <h2>Register For Pickle</h2>
      <form>
        <div class="imgcontainer">
          <img src={pickleavi} alt="Avatar" class="avatar"/>
        </div>

        <div class="container">
        {error && <p>{error}</p>}
        <label for="firstname">
          <b>First Name</b>
        </label>
        <input type="text" name="firstname"/>
        <label for="lastname">
          <b>Last Name</b>
        </label>
        <input type="text" name="lastname"/>
        <label for="username">
         <b>Username</b></label>
          <input type="text" name="username" value={username} onChange={handleChange}/>
        <label for="pw">
          <b>Password</b></label>
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            value={password}
            onChange={handleChange}
          />
        <Button variant="link" onClick={() => setShowPassword (!showPassword)}>show password</Button>
        <Button onClick={handleSubmit}>Register</Button>
        </div>
      </form>
    </div>
  );
}

export default Register;