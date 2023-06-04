import logo from "../assets/TodoLogo.png";
import BgNight from "../assets/bg-night.jpg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { loginHandler, logoutHandler } from "../redux/reducers/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginRedux = useSelector((state) => state.loginHandler.loginData);
  useEffect(() => {
    keepLogin();
  }, []);

  const onLogout = () => {
    toast.success("You have successfully logged out");
    localStorage.clear();
    dispatch(logoutHandler());
    navigate("/login");
  };

  const keepLogin = async () => {
    try {
      let getStorage = localStorage.getItem("userid");
      if (getStorage !== null) {
        let response = await axios.get(
          `http://localhost:5000/users/loginstatus?userid=${getStorage}`
        );
        dispatch(loginHandler(response.data));
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <Toaster position="top-center" />
        <img className="bg-image" src={BgNight} alt="" />
        <div className="nav-left">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="nav-right">
          {loginRedux.loginStatus ? (
            <>
              <span>
                <button
                  onClick={onLogout}
                  className="bg-red-700 text-white w-20 font-bold mt-3 px-3 mx-3 rounded-md h-8"
                >
                  Logout
                </button>
              </span>
            </>
          ) : (
            <span>
              <Link to="/login">
                <button className="bg-orange-600/60 text-white w-20 font-bold mt-3 px-3 mx-3 rounded-md h-8">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-500/60 text-white w-20 font-bold mt-3 px-3 mx-3 rounded-md h-8">
                  Register
                </button>
              </Link>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
