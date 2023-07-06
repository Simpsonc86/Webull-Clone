import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";
function LoginFormSection() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  let history = useHistory();
  if (sessionUser) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <h1 className="header">Log in to Webear</h1>
      <form className="formclass" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="email">
          <p className="formtext">Email</p>
          <input
            className="loginInputs"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label class="password">
          <p className="formtext">Password</p>
          <input
            className="loginInputs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="submit" type="submit">
          Log In
        </button>
      </form>
      <div className="botCont">
        <p className="signup">Don't have an account yet?</p>
        <button onClick={() => history.push("/signup")}>
          Signup
        </button>
      </div>
    </>
  );
}

export default LoginFormSection;
