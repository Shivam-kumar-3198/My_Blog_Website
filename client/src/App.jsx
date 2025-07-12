import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout"; 
import Dashboard from "./pages/admin/Dashboard";
import Addblog from "./pages/admin/Addblog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/blog/:id" element={<Blog />} />

      <Route path="/admin" element={true ? <Layout /> : <Login />}>
        <Route index element={<Dashboard />} />
        <Route path="addBlog" element={<Addblog />} />
        <Route path="listBlog" element={<ListBlog />} />
        <Route path="comments" element={<Comments />} />
      </Route>
    </Routes>
  );
};

export default App;
