import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTablesItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, _id } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  // ✅ Delete Blog
  const deleteBlog = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const { data } = await axios.delete(`/api/blog/${blog._id}`);
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting blog");
    }
  };

  // ✅ Toggle Publish
  const togglePublish = async () => {
    try {
      const { data } = await axios.patch(`/api/blog/${blog._id}/toggle-publish`);
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error toggling publish");
    }
  };

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors duration-200">
      
      {/* Index */}
      <td className="px-4 py-4 md:px-6 font-medium text-gray-700">
        {index}
      </td>
      
      {/* Title */}
      <td className="px-4 py-4 md:px-6 font-medium text-gray-900 truncate max-w-[150px] sm:max-w-xs">
        {title}
      </td>
      
      {/* Date */}
      <td className="px-4 py-4 md:px-6 text-gray-500 max-sm:hidden">
        {BlogDate.toDateString()}
      </td>

      {/* ✅ Status */}
      <td className="px-4 py-4 md:px-6 max-sm:hidden">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            blog.isPublished 
              ? "bg-green-100 text-green-700" 
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>

      {/* ✅ Actions */}
      <td className="px-4 py-4 md:px-6">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={togglePublish}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              blog.isPublished
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>

          <button
            onClick={deleteBlog}
            className="p-1.5 rounded-lg hover:bg-red-50 group transition-colors focus:outline-none"
            title="Delete Blog"
          >
            <img
              src={assets.cross_icon}
              className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 object-contain"
              alt="delete"
            />
          </button>
        </div>
      </td>

    </tr>
  );
};

export default BlogTablesItem;