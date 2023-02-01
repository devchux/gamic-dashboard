import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoIcon } from "../../assets/svgs";
import Button from "../../components/button/button";
import InputText from "../../components/inputs/input-text";
import { Helpers } from "../../services/helpers";

const envEmail = process.env.REACT_APP_AUTH_EMAIL;
const envPassword = process.env.REACT_APP_AUTH_PASSWORD;

const helpers = new Helpers();

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = () => {
    if (!input.email || !input.password)
      return toast.error("Incomplete credentials");
    if (
      input.email.toLowerCase() !== envEmail.toLowerCase() ||
      input.password.toLowerCase() !== envPassword.toLowerCase()
    )
      return toast.error("Email or Password is incorrect");

    helpers.storeToken(envEmail);
    navigate("/");
  };

  return (
    <div className="login">
      <div className="form-wrapper">
        <div className="logo-wrapper">
          <LogoIcon />
        </div>
        <InputText
          type="email"
          value={input.email}
          placeholder="Enter Email Address"
          onChange={({ target: { value } }) =>
            setInput({ ...input, email: value })
          }
        />
        <InputText
          type="password"
          value={input.password}
          placeholder="Enter Password"
          onChange={({ target: { value } }) =>
            setInput({ ...input, password: value })
          }
        />
        <div>
          <Button colored block onClick={onSubmit}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
