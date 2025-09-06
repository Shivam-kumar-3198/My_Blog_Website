import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTablesItems from "./BlogTablesItems";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(true);

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to load dashboard data");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Dashboard Stats */}
      <div className="flex flex-wrap gap-4">
        {[
          { count: dashboardData.blogs, label: "Blogs", icon: assets.dashboard_icon_1 },
          { count: dashboardData.comments, label: "Comments", icon: assets.dashboard_icon_2 },
          { count: dashboardData.drafts, label: "Drafts", icon: assets.dashboard_icon_3 },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white p-4 min-w-56 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <img src={item.icon} alt={`${item.label} icon`} className="w-10 h-10" />
            <div>
              <p className="text-lg font-semibold">{item.count}</p>
              <p className="text-gray-500 text-sm">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Blogs */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-8 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="Latest blogs" />
          <p className="font-medium">Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          {loading ? (
            <p className="text-center p-6 text-gray-500">Loading dashboard...</p>
          ) : dashboardData.recentBlogs.length === 0 ? (
            <p className="text-center p-6 text-gray-500">No recent blogs found</p>
          ) : (
            <table className="w-full text-sm text-gray-600">
              <thead className="text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-2 py-4 xl:px-6">#</th>
                  <th className="px-2 py-4">Blog Title</th>
                  <th className="px-2 py-4 max-sm:hidden">Date</th>
                  <th className="px-2 py-4 max-sm:hidden">Status</th>
                  <th className="px-2 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTablesItems
                    key={blog._id || index}
                    blog={blog}
                    fetchBlogs={fetchDashboard} // ✅ fixed typo
                    index={index + 1} // ✅ start numbering at 1
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
