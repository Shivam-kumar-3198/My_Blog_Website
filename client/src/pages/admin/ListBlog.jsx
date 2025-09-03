import React, { useEffect } from 'react';
import BlogTablesItems from './BlogTablesItems';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {
  const { blogs, setBlogs, axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      // ✅ Use same endpoint as AppContext (or update if backend has /api/admin/blogs)
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
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTablesItems key={blog._id || index} blog={blog} index={index} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
