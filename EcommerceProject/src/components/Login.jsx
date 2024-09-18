import { useState } from "react";
import { useLoginMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";
import pickleavi from "../img/Pickle-Avi.jpg";
import logo from "../img/White-logo.png";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../styles/Home.css';
import ItemDetail from "./ItemDetail";

function Login({ setToken }) {
    const initialForm = {
        username: "",
        password: "",
    };

    const [form, updateForm] = useState(initialForm);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [login] = useLoginMutation();

    const Navigate = useNavigate ()

    const handleChange = ({ target }) => {
        setError(null);
        updateForm({...form, [target.name]: target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (form.username === "" || form.password === "") {
            setError("Please provide a username and password");
            return;
        }

        const { data, error } = await login(form);

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
          <h2>Login</h2>
          <form>
            <div class="imgcontainer">
              <img src={logo} alt="Avatar" class="avatar"/>
            </div>
    
            <div class="container">
            {error && <p>{error}</p>}
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
            <Button onClick={handleSubmit}>Login</Button><br></br><br></br>
            </div>
          </form>
        </div>
    ); 
}

export default Login;