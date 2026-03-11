import React, { useEffect } from 'react';
import BlogTablesItem from '../admin/BlogTablesItems'; // ✅ singular import
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
    <div className="flex-1 w-full min-h-screen p-4 sm:p-6 md:p-10 bg-blue-50/50 box-border overflow-hidden flex flex-col">
      
      {/* Page Header */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
        All Blogs
      </h1>

      {/* Table Container */}
      <div className="w-full overflow-x-auto bg-white shadow-sm border border-gray-100 rounded-xl scrollbar-hide flex-1">
        
        {blogs.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-500 font-medium">
            No blogs available.
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-600 min-w-[600px] whitespace-nowrap">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th scope="col" className="px-4 py-4 md:px-6 font-semibold">#</th>
                <th scope="col" className="px-4 py-4 md:px-6 font-semibold">Blog Title</th>
                <th scope="col" className="px-4 py-4 md:px-6 font-semibold max-sm:hidden">Date</th>
                <th scope="col" className="px-4 py-4 md:px-6 font-semibold max-sm:hidden">Status</th>
                <th scope="col" className="px-4 py-4 md:px-6 font-semibold text-center sm:text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
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
        )}
      </div>
      
    </div>
  );
};

export default ListBlog;