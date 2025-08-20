import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const RegisterPage = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState('');
  const pattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const navigate=useNavigate()


  const formSubmit =async (event) => {
    event.preventDefault();
    if (fullname === '') {
      setError("Please enter fullname.")

    }
    else if (email === '') {
      setError("Please enter email.")

    }
    else if (!pattern.test(password)) {
      setError("Password must contain 1 uppercase 1 number and At least 6 character")
    }
    else if(repassword=='')
    {
      setError("Please reenter repassword")
    }
    else if (password !== repassword) {
      setError("Password and Repassword doesnot match")
    }
    else {
      try {
        const result = await axios.post("http://localhost:3000/register", { fullname, email, password })
        toast.success(result.data);
        setTimeout(()=>{
          navigate('/login')
        },2000)

      }
      catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        <form className="flex flex-col gap-4" onSubmit={formSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="p-3 border border-gray-300 rounded-lg outline-none "

            onChange={(event) => setFullname(event.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg outline-none"

            onChange={(event) => setEmail(event.target.value)}

          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg outline-none "

            onChange={(event) => setPassword(event.target.value)}
            
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="p-3 border border-gray-300 rounded-lg outline-none"

            onChange={(event) => setRepassword(event.target.value)}
          />
          <div className="text-red-700 border-red-100" >{error}</div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
        <div className="text-center py-5">Already have an account? <Link to='/login' className="underline text-blue-700">Login</Link></div>
      </div>
    </div>
  );
};

export default RegisterPage;
