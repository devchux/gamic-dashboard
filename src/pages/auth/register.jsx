import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoIcon } from "../../assets/svgs";
import Button from "../../components/button/button";
import InputText from "../../components/inputs/input-text";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const api = process.env.REACT_APP_BACKEND_API;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ email: "", password: "", cPassword: "" });
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!input.email || !input.password || !input.cPassword)
      return toast.error("Incomplete credentials");

    if (input.cPassword !== input.password) return toast.error("Passwords do not match");

    try {
      setLoading(true);
      const { data } = await axios.post(`${api}/auth/register`, input);
      toast.success(data?.message ?? 'Sign up successful')
      navigate('/login')
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
        <InputText
          type="password"
          value={input.cPassword}
          placeholder="Enter Confirm Password"
          onChange={({ target: { value } }) =>
            setInput({ ...input, cPassword: value })
          }
        />
        <div>
          <Button colored block onClick={onSubmit}>
            {loading ? <BeatLoader color="#ffffff" /> : "Register"}
          </Button>
        </div>
        <p className="alt-link">Don't have account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
