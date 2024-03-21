import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../Layouts/Signup/Signup";
import Login from "../Layouts/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Navbar from "../components/Navbar/Navbar";
import Home from "../Layouts/Home/Home";

const AllRoute= () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AllRoute;
