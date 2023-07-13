import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data.errors);
    }
  };

  const demoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@user.io", "password"));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div>
      <form className="login-page-container" onSubmit={handleSubmit}>
        <br></br>
        <h3>Log in to Plate Pal</h3>
        <br></br>
        <ul className="login-form-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="new-platepal-container">
          New to Plate Pal?{" "}
          <Link className="new-platepal-sign-up" to="/signup">
            Sign up
          </Link>
        </div>

        <br></br>
        <button className="login-form-button" type="submit">
          Log In
        </button>
        <button
          className="demo-user-button"
          type="submit"
          onClick={(e) => demoSignIn(e)}
        >
          Continue with Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;
