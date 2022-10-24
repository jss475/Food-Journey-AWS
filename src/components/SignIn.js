import React from "react";
import logo from "../smalllogo.gif";

function SignIn({ handleSignInSubmit, signInMsg }) {
  return (
    <div id="sign_in_bg">
      <div className="loginbox">
        <img src={logo} className="avatar" />
        <h3 id="sign_in_up_text">Please Sign In!</h3>
        <form id="sign_in_form" onSubmit={handleSignInSubmit}>
          <p>Username</p>
          <input
            name="username"
            type="username"
            placeholder="Enter your username"
          />
          <p>Password</p>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <button type="submit">Submit</button>
          <br />
          <br />
          <em>{signInMsg}</em>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
