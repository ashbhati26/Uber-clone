import React, { useState, useContext } from "react";
import UberLogo from "../assets/UberLogo.png";
import { Link, useNavigate } from "react-router-dom";
import UserContext, { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16 mb-5" src={UberLogo} alt="" />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded-md px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-3 rounded-md px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <button className="w-full bg-black text-white font-semibold py-3 rounded-md mt-5 text-lg">
            Login
          </button>
        </form>
        <p className="text-center mt-2">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account{" "}
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="w-full flex items-center justify-center bg-[#fdee21] font-semibold text-black py-3 rounded-md mt-5 text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
