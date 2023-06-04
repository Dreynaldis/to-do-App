import toast, { Toaster } from "react-hot-toast";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [revealPwd, setRevealPwd] = useState(false);
  let username = useRef();
  let password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async () => {
    let inputUsername = username.current.value;
    let inputPassword = password.current.value;
    try {
      let response = await axios.get(
        `http://localhost:5000/users/login?username=${inputUsername}&password=${inputPassword}`
      );

      if (response.data.length === 0)
        throw toast.error("username and/or password is invalid");
      else {
        toast.success("Login Success");
        localStorage.setItem("userid", JSON.stringify(response.data[0].userid));
        dispatch(loginHandler(response.data));
        navigate("/");
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="container align-middle flex flex-col ">
        <Toaster position="top-center" />
        <h1 className="w-auto text-center text-white text-3xl my-4">
          Please login to get your Todo-list Tasks
        </h1>
        <div className="register-field flex justify-center flex-row ">
          <div className="field text-white shadow-lg w-96 todo-container rounded-xl p-5 flex flex-col bg-slate-800/80">
            <label className="text-lg">Username</label>
            <input
              className="rounded-md my-3 bg-slate-400/60 w-full px-3 h-9"
              type="text"
              ref={username}
              placeholder="Input your username here"
            />
            <label className="text-lg">Password</label>
            <span className="relative">
              <input
                className="rounded-md my-3 bg-slate-400/60 w-full px-3 h-9"
                type={revealPwd ? "text" : "password"}
                ref={password}
                placeholder="Input your password here"
              />
              <FontAwesomeIcon
                className="absolute bottom-5 right-3"
                icon={revealPwd ? faEyeSlash : faEye}
                onClick={() => setRevealPwd((a) => !a)}
              />
            </span>
            <div className="register-button flex justify-end">
              <button
                onClick={onLogin}
                className="bg-green-500/60 font-bold mt-3 px-3 rounded-md h-8"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
