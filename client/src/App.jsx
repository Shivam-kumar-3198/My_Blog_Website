import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/admin/Layout"; // Assuming Layout is the Dashboard layout
import Addblog from "./pages/admin/Addblog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        <Route path="/admin" element={true ? <Dashboard />: <Login/>}>
          <Route path="addBlog" element={<Addblog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
