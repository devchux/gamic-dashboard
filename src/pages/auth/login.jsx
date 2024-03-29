import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoIcon } from "../../assets/svgs";
import Button from "../../components/button/button";
import InputText from "../../components/inputs/input-text";
import { Helpers } from "../../services/helpers";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const api = process.env.REACT_APP_BACKEND_API;

const helpers = new Helpers();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!input.email || !input.password)
      return toast.error("Incomplete credentials");

    try {
      setLoading(true);
      const { data } = await axios.post(`${api}/auth/login`, input);
      helpers.storeToken(data?.token);
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
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
            {loading ? <BeatLoader color="#ffffff" /> : "Login"}
          </Button>
        </div>
        <p className="alt-link">Don't have account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
