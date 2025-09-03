import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// ✅ set base URL for axios
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true); // ✅ new loading state

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all');
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch blogs");
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // ✅ Load token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          axios.defaults.headers.common['Authorization'] = storedToken;
        }

        // ✅ Fetch blogs
        await fetchBlogs();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // ✅ Finish loading
      }
    };

    init();
  }, []);

  // ✅ Keep axios + localStorage synced with token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = {
    axios,     // axios instance
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    loading,   // ✅ expose loading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
