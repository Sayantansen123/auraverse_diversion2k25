import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../authcontext/authcontext";

//login page component
const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);

  //to handle input of each field
  const handelInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value,
    });
  };

  

  //to submit the whole data
  const handelSubmit = async (e) => {
    e.preventDefault(); //preventing the page to load again after refresh
    setLoading(true);
    console.log(userInput);
    try {
      const login = await axios.post(
        "http://localhost:5000/api/user/login",
        userInput
      );
      const data = login.data;
      if (data.success === false) {
        setLoading(false);
        localStorage.setItem("jwt", data.token);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("auraverse", JSON.stringify(data));
      setLoading(false);
      setAuthUser(data);
      navigate("/leaderboard");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Starts below and hidden
      animate={{ opacity: 1, y: 0 }} // Moves up and fades in
      transition={{ duration: 0.6, ease: "easeIn" }}
      className="max-w-lg w-[700px] px-3 relative"
    >
      <motion.div className="bg-white/10 backdrop-blur-lg rounded-lg  overflow-hidden ">
        <div className="p-6">
          <h2 className="text-center text-3xl font-medium text-white max-md:text-2xl">
            Welcome Back
          </h2>
          <p
            className="mt-2 text-center text-white max-md:text-sm"
            id="horizontalbar1"
          >
            Sign in to continue
          </p>
          <form
            method="POST"
            onSubmit={handelSubmit}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  onChange={handelInput}
                  type="email"
                  name="email"
                  id="email"
                />
              </div>

              <div className="mt-4">
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  onChange={handelInput}
                  id="password"
                  type="password"
                  name="password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-white focus:ring-indigo-400 border-gray-600 rounded"
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                />
                <label
                  className="ml-2 block text-sm text-white"
                  for="remember-me"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  className="font-medium text-white hover:text-indigo-400"
                  href="#"
                >
                  Forgot your password
                </a>
              </div>
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
               
              >
                {loading ? "loading.." : "Login"}
              </button>
            </div>
          </form>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -50 }} // Starts below and hidden
          animate={{ opacity: 1, y: 0 }} // Moves up and fades in
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="px-8 py-4 bg-white/10 backdrop-blur-lg text-center"
        >
          <span className="text-white">Don't have an account?</span>
          <Link
            to="/register"
            className="font-medium text-[rgba(0,0,0,0.93)] hover:text-indigo-400 px-2"
          >
            Sign Up
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
