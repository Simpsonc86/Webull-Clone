import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const [dob, setDOB] = useState("");
  let history = useHistory();

  if (sessionUser) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName, dob));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <>
      <h1 class="signupHeader">Sign Up</h1>
      <form class="signupFormClass" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className = "signupFirst">
          First Name
          <input type="text"
          className = "signupInput"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required />
        </label>
        <label class = "signupLast">
          Last Name
          <input type="text"
          className = "signupInput"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required />
        </label>
        <label className = "signupDOB">
          Date of Birth
          <input type="date"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
          required
          />
        </label>
        <label className="signupEmail">
          Email
          <input
          className = "signupInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="signupUsername">
          Username
          <input
          class = "signupInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label class="signupPassword">
          Password
          <input
          className = "signupInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label class="signupConfirmPassword">
          Confirm Password
          <input
          className = "signupInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className = "signupButton" type="submit">Sign Up</button>
      </form>
      <div className="signupBotCont">
        <p>Already have an account?</p>
        <button  onClick={() => history.push("/login")}>Login</button>
      </div>
    </>
  );
}

export default SignupFormPage;
