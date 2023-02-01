import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoIcon } from "../../assets/svgs";
import Button from "../../components/button/button";
import InputText from "../../components/inputs/input-text";
import { Helpers } from "../../services/helpers";
const envUsers = process.env.REACT_APP_USERS;
const users = envUsers?.replace(/\[|\]/g, "").split("-");

const helpers = new Helpers();

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = () => {
    if (!input.email || !input.password)
      return toast.error("Incomplete credentials");

    let isValid = null;
    let progress = 0;

    users.every((objStr) => {
      const obj = JSON.parse(objStr);
      progress += 1;
      if (
        obj.email.toLowerCase() === input.email.toLowerCase() &&
        obj.password.toLowerCase() === input.password.toLowerCase()
      ) {
        isValid = true;
        return false;
      } else {
        return true;
      }
    });

    if (isValid) {
      helpers.storeToken(input.email);
      navigate("/");
      return;
    }

    if (progress === users.length) {
      return toast.error("Email or Password is incorrect");
    }
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
