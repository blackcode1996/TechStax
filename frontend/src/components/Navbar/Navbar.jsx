import React from "react";
import { useNavigate } from "react-router-dom";
import logoC from "../../assets/logoC.png";
// import "../../assets/logoC"

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-dark-purple">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <a href="/">
            <img src={logoC} height="100" width="100" alt="techstax.ml" />
          </a>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="px-3 py-1 text-sm text-blue-500 hover:text-blue-700"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              onClick={() => navigate("/signup")}
            >
              Sign up for free
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
              onClick={() => {
                localStorage.removeItem("userData");
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
