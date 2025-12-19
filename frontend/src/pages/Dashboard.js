import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* --- GOALS SUMMARY CARD --- */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Goals Summary
          </h2>

          {/* Dummy Goal 1 */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Buy New Laptop
              </span>
              <span className="text-sm font-medium text-blue-600">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          {/* Dummy Goal 2 */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Emergency Fund
              </span>
              <span className="text-sm font-medium text-green-600">40%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>

          <button className="mt-4 w-full text-blue-500 hover:text-blue-700 text-sm font-semibold">
            + Add New Goal
          </button>
        </div>

        {/* Portfolio Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Portfolio Value
          </h2>
          <p className="text-3xl font-bold text-gray-900">₹ 1,25,000</p>
          <p className="text-green-500 text-sm mt-1">↑ 5.4% this month</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
