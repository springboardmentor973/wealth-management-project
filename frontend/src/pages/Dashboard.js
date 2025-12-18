import { Target, Briefcase, User, TrendingUp, PieChart, Wallet, Menu, Home, X } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 lg:hidden hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2">
            <div className="mb-6">
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Dashboard</h3>
              <a href="#" className="flex items-center px-4 py-3 space-x-3 text-gray-700 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100">
                <Home className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-600">Dashboard</span>
              </a>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Components</h3>
              <a href="/goals" className="flex items-center px-4 py-3 space-x-3 text-gray-700 transition-colors rounded-lg hover:bg-gray-100">
                <Target className="w-5 h-5" />
                <span>Goals</span>
              </a>
              <a href="/portfolio" className="flex items-center px-4 py-3 space-x-3 text-gray-700 transition-colors rounded-lg hover:bg-gray-100">
                <Briefcase className="w-5 h-5" />
                <span>Portfolio</span>
              </a>
              <a href="/profile" className="flex items-center px-4 py-3 space-x-3 text-gray-700 transition-colors rounded-lg hover:bg-gray-100">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Stats Bar */}
        <div className="p-6 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center mb-6 lg:hidden">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="text-gray-700 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Goals */}
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-blue-500 rounded-full">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Goals</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
              </div>

              {/* Total Investment */}
              <div className="flex items-center space-x-4">
                <div className="p-4 rounded-full bg-cyan-500">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Invested</p>
                  <p className="text-2xl font-bold text-gray-800">₹0</p>
                </div>
              </div>

              {/* Current Value */}
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-orange-500 rounded-full">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Value</p>
                  <p className="text-2xl font-bold text-gray-800">₹0</p>
                </div>
              </div>

              {/* Total Gain/Loss */}
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-yellow-500 rounded-full">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Gain/Loss</p>
                  <p className="text-2xl font-bold text-gray-800">₹0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Personalized Wealth Management & Goal Tracker</h1>
            <p className="mt-1 text-gray-500">Welcome to your financial overview</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Goals Card */}
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Goals</h2>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Goals:</span>
                  <span className="text-lg font-semibold text-gray-800">0</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Target:</span>
                  <span className="text-lg font-semibold text-gray-800">₹0</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600">Progress:</span>
                  <span className="text-lg font-semibold text-gray-800">0%</span>
                </div>
              </div>

              <a href="/goals">
                <button className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Go to Goals
                </button>
              </a>
            </div>

            {/* Portfolio Card */}
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Portfolio</h2>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Briefcase className="w-5 h-5 text-green-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Invested:</span>
                  <span className="text-lg font-semibold text-gray-800">₹0</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Current Value:</span>
                  <span className="text-lg font-semibold text-gray-800">₹0</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600">Gain/Loss:</span>
                  <span className="text-lg font-semibold text-gray-800">₹0</span>
                </div>
              </div>

              <a href="/portfolio">
                <button className="mt-6 w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Go to Portfolio
                </button>
              </a>
            </div>

            {/* Profile Card */}
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Name:</span>
                  <span className="text-base font-semibold text-gray-800">Demo User</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm font-semibold text-gray-800">demo@gmail.com</span>
                </div>
              </div>

              <a href="/profile">
                <button className="mt-6 w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  Go to Profile
                </button>
              </a>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
            {/* Goal Progress Overview */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Goal Progress Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50">
                  <div>
                    <p className="text-sm text-gray-600">Active Goals</p>
                    <p className="text-xl font-bold text-blue-600">0</p>
                  </div>
                  <div className="p-3 bg-blue-500 rounded-full">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50">
                  <div>
                    <p className="text-sm text-gray-600">Completed Goals</p>
                    <p className="text-xl font-bold text-green-600">0</p>
                  </div>
                  <div className="p-3 bg-green-500 rounded-full">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Portfolio Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-cyan-50">
                  <div>
                    <p className="text-sm text-gray-600">Total Holdings</p>
                    <p className="text-xl font-bold text-cyan-600">0</p>
                  </div>
                  <div className="p-3 rounded-full bg-cyan-500">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-orange-50">
                  <div>
                    <p className="text-sm text-gray-600">Return Rate</p>
                    <p className="text-xl font-bold text-orange-600">0%</p>
                  </div>
                  <div className="p-3 bg-orange-500 rounded-full">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}