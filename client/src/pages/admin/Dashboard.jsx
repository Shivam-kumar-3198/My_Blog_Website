import React, { useEffect, useState } from "react";
import { dashboard_data, assets } from "../../assets/assets";
import BlogTablesItems from "./BlogTablesItems";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    setDashboardData(dashboard_data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        {[
          { count: dashboardData.blogs, label: "Blogs", icon: assets.Dashboard_icon_1 },
          { count: dashboardData.comments, label: "Comments", icon: assets.Dashboard_icon_2 },
          { count: dashboardData.drafts, label: "Drafts", icon: assets.Dashboard_icon_3 },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all"
          >
            <img src={item.icon} alt="" />
            <div>
              <p>{item.count}</p>
              <p className="text-gray-400 font-light">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
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
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTablesItems
                  key={blog._id || index}
                  blog={blog}
                  fetchBLogs={fetchDashboard}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
