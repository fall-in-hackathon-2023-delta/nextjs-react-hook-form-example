import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { signIn } from "next-auth/react";
import signUp from "../services/signUp";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
    const [request, setRequest] = useState(false);

    const {
        error: signUpError,
        isSuccess: signupIsSuccess
     }: {
        error: any;
        isSuccess: boolean;
     } = useQuery(["signUp"], () => signUp({
        email,
        password,
        firstName: "Test",
        lastName: "User"
     }), {
        refetchOnWindowFocus: false,
        enabled: request ,
        retry: false,
        onError: (error: any) => {
           console.log(error);
        },
        onSuccess: (data: any) => {
              console.log("signUp success", {data});
              signIn();
          }
     });


  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleSignUpEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSignUpPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const validateForm = (e: any) => {
    e.preventDefault();
    let isValid = true;

    if (username === "") {
      setUsernameError("Please enter your username.");
      isValid = false;
    } else {
      setUsernameError("");
    }

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
      // This is where you'd normally send the data to your server to handle
      // actual registration, which is not possible in this example
      console.log("Username: ", username, "Email: ", email, "Password: ", password);
      window.location.href = "login.html"; // Redirect when the form is valid
    }
  
    setRequest(true);
  };
 
  return (
    <div className="signup-form">
      <h1 className="title"> Sign Up for a Voyage</h1>
      <form onSubmit={validateForm} >
        
        <label className="signup-label">Username</label>
        <br />
        {/* <input type="text" value={username} className="signup-field" onChange={handleUsernameChange} required />
        <br /> */}
        {usernameError && <div className="error">{usernameError}</div>}
        <label className="signup-labelEmail">Email</label>
        <br />
        <input type="email" value={email} className="signup-field" onChange={handleSignUpEmailChange} required />
        <br />
        {emailError && <div className="error">{emailError}</div>}
        <label className="signup-label">Password</label>
        <br />
        <input
          type="password"
          value={password}
          className="signup-field"
          onChange={handleSignUpPasswordChange}
          required
        />
        <br />
        {passwordError && <div className="error">{passwordError}</div>}
        <button type="submit" className="signup-button">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
