import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import  validator from "validator";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", pass: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let newErrors = {};

    // Email validation
    if (!validator.isEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    } else {
      newErrors.email = "";
    }

    if (formData.pass.trim() === "") {
      newErrors.password = "Password is required";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 2) {
      try {
        let response = await axios.post("https://worldref-nine.vercel.app/user/login", formData);
        toast.success("Login successful");
        localStorage.setItem("userData", JSON.stringify(response.data.userData));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/");
      } catch (error) {
        toast.error(`Login failed: ${error.response.data.message}`);
      }
    }
    setIsLoading(false);
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="hidden md:block">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="object-contain h-full"
              alt="Phone image"
            />
          </div>
          <div className="p-8 md:p-0">
            <h1 className="text-3xl font-bold text-center text-blue-500 mb-5">Account login</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 px-3 mt-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter email"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  name="pass"
                  value={formData.pass}
                  onChange={handleChange}
                  className="w-full py-2 px-3 mt-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                  required
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Logging you in..." : "Login in"}
              </button>
            </form>
            <ToastContainer position="bottom-right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
