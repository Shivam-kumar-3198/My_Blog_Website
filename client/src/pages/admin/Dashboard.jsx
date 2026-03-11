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
    <div className="flex-1 w-full min-h-screen p-4 sm:p-6 md:p-10 bg-blue-50/50 box-border overflow-hidden">
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[
          { count: dashboardData.blogs, label: "Blogs", icon: assets.dashboard_icon_1 },
          { count: dashboardData.comments, label: "Comments", icon: assets.dashboard_icon_2 },
          { count: dashboardData.drafts, label: "Drafts", icon: assets.dashboard_icon_3 },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <img src={item.icon} alt={`${item.label} icon`} className="w-12 h-12 object-contain" />
            <div>
              <p className="text-xl md:text-2xl font-bold text-gray-800">{item.count}</p>
              <p className="text-gray-500 text-sm md:text-base font-medium">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Blogs */}
      <div className="mt-8 md:mt-10">
        <div className="flex items-center gap-3 mb-4 text-gray-700">
          <img src={assets.dashboard_icon_4} alt="Latest blogs" className="w-6 h-6" />
          <p className="text-lg font-semibold">Latest Blogs</p>
        </div>

        <div className="w-full overflow-x-auto shadow-sm border border-gray-100 rounded-xl bg-white scrollbar-hide">
          {loading ? (
            <p className="text-center p-8 text-gray-500 font-medium animate-pulse">Loading dashboard...</p>
          ) : dashboardData.recentBlogs.length === 0 ? (
            <p className="text-center p-8 text-gray-500 font-medium">No recent blogs found</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-600 min-w-[600px] whitespace-nowrap">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-4 md:px-6 font-semibold">#</th>
                  <th className="px-4 py-4 md:px-6 font-semibold">Blog Title</th>
                  <th className="px-4 py-4 md:px-6 font-semibold max-sm:hidden">Date</th>
                  <th className="px-4 py-4 md:px-6 font-semibold max-sm:hidden">Status</th>
                  <th className="px-4 py-4 md:px-6 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTablesItems
                    key={blog._id || index}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
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