import React, { useState } from "react";
import styles from './Login.module.css'

function LoginForm(props: { csrfToken: string }) {
  const { csrfToken } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  console.log("csrfToken: ", csrfToken);
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const validateForm = (e: any) => {
    e.preventDefault();
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password === "") {
      setPasswordError("Please enter your password.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      console.log("Email: ", email, "Password: ", password);
    }
  };

  return (
    <div className="login-form">
      <h1 className="title"> Voyageur</h1>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        aria-label="Login Form"
        /* onSubmit={validateForm} */
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label className="login-label">Email</label>
        <br />
        <input name="username" type="email" value={email} className="login-field" onChange={handleEmailChange} required />
        <br />
        {emailError && <div className="error">{emailError}</div>}
        <label className="login-label">Password</label>
        <br />
        <input name="password" type="password" value={password} className="login-field" onChange={handlePasswordChange} required />
        <br />
        {passwordError && <div className="error">{passwordError}</div>}
        <input type="submit" value="Login" className="login-button" />
        <button onClick={() => (window.location.href = "sign_in.html")} className="login-button">
          Sign Up
        </button>
        <div className="login-link">
          <a href="forgot_password.html">Forgot Password?</a>
          <br />
          <a href="privacy.html">Privacy Policy</a>
          <br />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
