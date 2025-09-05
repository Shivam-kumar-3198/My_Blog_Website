import React, { useEffect } from 'react';
import BlogTablesItem from '../admin/BlogTablesItems' // ✅ singular import
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {
  const { blogs, setBlogs, axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      // ✅ Adjust if your backend has a different admin endpoint
      const { data } = await axios.get('/api/blog/all');
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="text-xl font-semibold">All Blogs</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th className="px-2 py-4 xl:px-6">#</th>
              <th className="px-2 py-4">Blog title</th>
              <th className="px-2 py-4 max-sm:hidden">Date</th>
              <th className="px-2 py-4 max-sm:hidden">Status</th>
              <th className="px-2 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <BlogTablesItem 
                key={blog._id} 
                blog={blog} 
                index={index + 1} 
                fetchBlogs={fetchBlogs} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
