import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const RegisterPage = () => {
  const [revealPwd, setRevealPwd] = useState(false);

  let username = useRef();
  let email = useRef();
  let password = useRef();
  const onRegister = async () => {
    try {
      let inputUsername = username.current.value;
      let inputEmail = email.current.value;
      let inputPassword = password.current.value;
      let response = await axios.get("http://localhost:5000/users/getusers");
      const checkUser = response.data.some((e) => e.username === inputUsername);
      const checkEmail = response.data.some((e) => e.email === inputEmail);

      if (!inputUsername || !inputEmail || !inputPassword)
        throw toast.error("Data incomplete");
      else if (checkUser) throw toast.error("Username is taken");
      else if (checkEmail) throw toast.error("Email is already registered");
      else {
        await axios.post(`http://localhost:5000/users/register`, {
          username: inputUsername,
          email: inputEmail,
          password: inputPassword,
        });
        username.current.value = "";
        email.current.value = "";
        password.current.value = "";
        toast.success("Register Successful");
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="container align-middle flex flex-col ">
        <Toaster position="top-center" />

        <div className="register-field flex justify-center flex-row ">
          <div className="field text-white shadow-lg w-96 todo-container rounded-xl p-5 flex flex-col bg-slate-800/80">
            <label className="text-lg">Username</label>
            <input
              className="rounded-md my-3 bg-slate-400/60 w-full px-3 h-9"
              type="text"
              ref={username}
              placeholder="Input your username here"
            />
            <label className="text-lg">Email</label>
            <input
              className="rounded-md my-3 bg-slate-400/60 w-full px-3 h-9"
              type="email"
              ref={email}
              placeholder="Input your email here"
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
                onClick={onRegister}
                className="bg-green-500/60 font-bold mt-3 px-3 rounded-md h-8"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
