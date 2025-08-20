import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function loginSubmit(event) {
    setError("");
    event.preventDefault();
    if (email === "") {
      setError("Email must be filled");
    } else if (password === "") {
      setError("Password must be filled");
    } else {
      try {
        const result = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });
        if (result.data.success) {
          // console.log(result.data.id);
          sessionStorage.setItem("login", result.data.id);
          // setError('Login Successful')
          toast.success("Login successful", {
            autoClose: 1500,
            icon: () => <span className="text-blue-600">☑️</span>, // Blue tick
            className: "text-white-800", // Blue background and text
            progressClassName: "bg-blue-700", // Blue sliding line
          });

          navigate("/");
        } else {
          toast.error(result.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-10">
      <div className="w-full  max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg outline-none "
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 border
            border-gray-300 rounded-lg outline-none "
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="text-red-600">{error}</div>

          <button
            type="submit"
            onClick={loginSubmit}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>
        <div className="py-5 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-blue-700">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
