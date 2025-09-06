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
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>

      {/* ✅ Status */}
      <td className={`px-2 py-4 ${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>
        {blog.isPublished ? "Published" : "Unpublished"}
      </td>

      {/* ✅ Actions */}
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>

        <img
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt="delete"
          onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

export default BlogTablesItem;
