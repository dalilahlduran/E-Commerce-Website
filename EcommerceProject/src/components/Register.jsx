import { useState } from "react";
import { useRegisterMutation } from "../redux/api";

function Register({ setToken }) {
  const initialForm = {
    username: "",
    password: "",
    email: "",
  };

  const [form, updateForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [register] = useRegisterMutation();

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
  };

  const { username, password, email } = form;

  return (
    <div>
      <h2>Register For ECommerce Reviews</h2>
      {error && <p>{error}</p>}
      <form>
        <label>
          Username
          <input name="username" value={username} onChange={handleChange} />
        </label>
        <label>
          Password
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input name="email" value={email} onChange={handleChange} />
        </label>
        <button onClick={handleSubmit}>Register</button>
      </form>
      <button onClick={() => setShowPassword(!showPassword)}>
        show password
      </button>
    </div>
  );
}

export default Register;