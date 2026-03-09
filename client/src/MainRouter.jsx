import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import EditProfile from "./user/EditProfile";

//signin
const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/user/edit/:userId" element={<EditProfile />} />
          <Route path="/user/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default MainRouter;
