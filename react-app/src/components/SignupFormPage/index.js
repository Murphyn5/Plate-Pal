import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(firstName, lastName, email, zipcode, password)
      );
      if (data) {
        setErrors(data.errors);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };


  return (
    <>
      <form className="sign-up-page-container" onSubmit={handleSubmit}>
        <br></br>
        <h3>Sign Up for Plate Pal</h3>
        <br></br>
        <ul className="signup-form-errors">
          {errors?.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="sign-up-page-names">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br></br>
        <button className="signup-form-button" type="submit">
          Sign Up
        </button>
        <div className="new-platepal-container">
          Already on Plate Pal?{" "}
          <Link className="new-platepal-log-in" to="/login">
            Log in
          </Link>
        </div>
      </form>
    </>
  );
}

export default SignupFormPage;
