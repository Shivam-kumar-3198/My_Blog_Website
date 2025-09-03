import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout"; 
import Dashboard from "./pages/admin/Dashboard";
import Addblog from "./pages/admin/Addblog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";
import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from "./context/AppContext";

// ✅ ProtectedRoute now uses context internally
const ProtectedRoute = ({ children }) => {
  const { token } = useAppContext();
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { token, loading } = useAppContext();

  if (loading) return <div>Loading...</div>; // or <Loader />

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={token ? <Navigate to="/admin" /> : <Login />} />

        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-blog" element={<Addblog />} />
          <Route path="list-blog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
