import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { IoEyeOff , IoEye } from "react-icons/io5"; 
import { motion } from "framer-motion";


export default function AuthForm({ mode }) {

  const BASE = import.meta.env.VITE_API_BASE_URL;
  const {  refreshUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/profile";
  const isSignUp = mode === "signup";

  const formDataInitialState = isSignUp
    ? { name: "", username: "", email: "", password: "" }
    : { username: "" , password: "" };


  const [formData, setFormData] = React.useState(formDataInitialState);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  
  React.useEffect(() => {
  setFormData(formDataInitialState);
  setError("");
  setSuccess(false);
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isSignUp ? `${BASE}/api/auth/register` : `${BASE}/api/auth/login`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();

      
      if (!res.ok) {
        setSuccess(false);
        throw new Error(data.message);
      }
      console.log( isSignUp ? "user registered" : "user logged in" );

      setSuccess(true);
      await refreshUser();
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      const devErrors = [
        "TypeError",
        "Failed to execute 'json' on 'Response': Unexpected end of JSON input",
        "NetworkError",
        "AbortError",
        "SyntaxError"
      ];
      setError(
          devErrors.includes(err.name) || devErrors.includes(err.message)
        ? "Something went wrong. Please check your connection."
        : err.message || "Something went wrong."
      );
      
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
    className={` ${isSignUp ? '' : 'h-screen'} bg-gray-200 sm:py-4 bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.75)),url('/assets/auth-bg.jpg')] bg-cover bg-center min-h-screen `}>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 sm:rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col gap-4 max-w-lg mx-auto h-full"
      >
        
          <motion.div 
          initial={{y:40, opacity: 0}}
          animate={{y:0, opacity: 1}}
          transition={{duration:0.8}}
          className="flex justify-center mb-2">
            <Link to="/" className="h-18 w-18 flex items-center justify-center rounded-full bg-yellow-100 shadow-sm shadow-gray-200">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </Link>
          </motion.div>
       

        <motion.h2 
        initial={{y:40, opacity: 0}}
        animate={{y:0, opacity: 1}}
        transition={{duration:0.8, delay: 0.1}}
        className="text-2xl lg:text-3xl font-serif font-bold text-center text-gray-800 ">
          { isSignUp ? "Create Your Account" : "Welcome Back" }
        </motion.h2>
        <motion.p 
        initial={{y:40, opacity: 0}}
        animate={{y:0, opacity: 1}}
        transition={{duration:0.8, delay: 0.2}}
        className="text-center text-gray-500 mb-2 -mt-2">
         {isSignUp ? "Join us and enjoy a refined luxury experience" : "Log in to your account."}
        </motion.p>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        {success && (
          <p className="text-blue-500 text-sm text-center">
            {isSignUp ? "Account created successfully" : "Login successful"}
          </p>
        )}

        {isSignUp ? <motion.div 
        initial={{y:40, opacity: 0}}
        animate={{y:0, opacity: 1}}
        transition={{duration:0.8, delay: 0.3}}
        className="flex flex-col gap-1">
          <label htmlFor="name" className=" text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-700"
          />
        </motion.div> : null}

         <motion.div 
         initial={{y:40, opacity: 0}}
        animate={{y:0, opacity: 1}}
        transition={{duration:0.8, delay: 0.4}}
         className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="john-doe"
            value={formData.username}
            onChange={handleChange}
            required
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-700"
          />
        </motion.div>

        {isSignUp ? <motion.div 
        initial={{y:40, opacity: 0}}
        animate={{y:0, opacity: 1}}
        transition={{duration:0.8, delay: 0.4}}
        className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-700"
          />
        </motion.div> : null}

       <motion.div 
       initial={{y:40, opacity: 0}}
      animate={{y:0, opacity: 1}}
      transition={{duration:0.8, delay: 0.5}}
       className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="border rounded-md px-4 py-2 pr-10 w-full focus:outline-none focus:ring-1 focus:ring-yellow-700"
          />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <IoEye className="w-8 text-xl text-yellow-700 cursor-pointer"/> : <IoEyeOff className="w-8 text-xl text-yellow-700 cursor-pointer"/>}
            </button>
          </div>
        </motion.div>

        <motion.button
          initial={{y:40, opacity: 0}}
          animate={{y:0, opacity: 1}}
          transition={{duration:0.8 , delay: 0.6}}
          type="submit"
          disabled={loading}
          className="mt-4 cursor-pointer bg-yellow-700 text-white py-2 rounded-md font-semibold hover:bg-yellow-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (isSignUp ? "Creating account..." : "Logging in...") : (isSignUp  ? "Create Account" : "Log In")}
        </motion.button>
        <motion.p 
          initial={{y:50, opacity: 0}}
          animate={{y:0, opacity: 1}}
          transition={{duration:0.8, delay: 1}}
        className="text-center text-sm text-gray-600 pb-4">
          {isSignUp ? "Already have an account?" : "Don't have an account yet?"}
          <Link to={isSignUp ? "/login" : "/signup"} className="text-yellow-700 font-medium hover:underline">
           {isSignUp ? " Log in" : " Sign up"}
          </Link>
        </motion.p>
      </form>
      
    </section>
  );
}