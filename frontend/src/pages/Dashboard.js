import { Target, Briefcase, User, TrendingUp, PieChart, Wallet, Menu, Home, X, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-purple-300 rounded-full -top-40 -right-40 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bg-blue-300 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-pink-300 rounded-full top-1/2 left-1/2 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Modern Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 backdrop-blur-xl bg-white/70 shadow-2xl border-r border-white/50 transition-transform duration-300 ease-in-out`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">WealthTrack</h2>
            </div>
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
              <a href="/" className="flex items-center px-4 py-3 space-x-3 text-white transition-all transform shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105">
                <Home className="w-5 h-5" />
                <span className="font-semibold">Dashboard</span>
              </a>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Components</h3>
              <a href="/goals" className="flex items-center px-4 py-3 space-x-3 text-gray-700 transition-all rounded-xl hover:bg-white/60 backdrop-blur-sm">
                <Target className="w-5 h-5" />
                <span>Goals</span>
              </a>
              <a href="/portfolio" className="flex items-center px-4 py-3 space-x-3 text-gray-700 transition-all rounded-xl hover:bg-white/60 backdrop-blur-sm">
                <Briefcase className="w-5 h-5" />
                <span>Portfolio</span>
              </a>
              <a href="/profile" className="flex items-center px-4 py-3 space-x-3 text-gray-700 transition-all rounded-xl hover:bg-white/60 backdrop-blur-sm">
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
      <div className="relative flex-1">
        {/* Modern Header */}
        <div className="p-6 border-b shadow-xl backdrop-blur-xl bg-white/40 border-white/50">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="text-gray-700 lg:hidden hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-3 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text">
                    Personalized Wealth Management
                  </h1>
                  <p className="text-sm text-gray-600">Welcome to your financial overview</p>
                </div>
              </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Total Goals', value: '0', icon: Target, gradient: 'from-blue-500 to-cyan-500' },
                { label: 'Total Invested', value: '₹0', icon: Wallet, gradient: 'from-green-500 to-emerald-500' },
                { label: 'Current Value', value: '₹0', icon: TrendingUp, gradient: 'from-orange-500 to-red-500' },
                { label: 'Total Gain/Loss', value: '₹0', icon: PieChart, gradient: 'from-purple-500 to-pink-500' }
              ].map((stat, idx) => (
                <div key={idx} className="p-4 transition-all transform border shadow-lg group backdrop-blur-xl bg-white/60 rounded-2xl border-white/50 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1 text-xs tracking-wide text-gray-500 uppercase">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Goals Card */}
            <div className="overflow-hidden transition-all duration-500 transform border shadow-xl group backdrop-blur-xl bg-white/60 rounded-3xl border-white/50 hover:shadow-2xl hover:-translate-y-2">
              <div className="relative p-6 overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500">
                <div className="absolute inset-0 transition-colors bg-black/10 group-hover:bg-black/0"></div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <h2 className="mb-1 text-2xl font-bold text-white drop-shadow-lg">Goals</h2>
                    <p className="text-sm text-white/80">Track your targets</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Goals:</span>
                    <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">0</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Target:</span>
                    <span className="text-xl font-bold text-gray-800">₹0</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium text-gray-600">Progress:</span>
                    <span className="text-xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">0%</span>
                  </div>
                </div>

                <a href="/goals">
                  <button className="flex items-center justify-center w-full py-3 mt-6 space-x-2 font-semibold text-white transition-all transform bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:shadow-xl hover:scale-105">
                    <span>Go to Goals</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            {/* Portfolio Card */}
            <div className="overflow-hidden transition-all duration-500 transform border shadow-xl group backdrop-blur-xl bg-white/60 rounded-3xl border-white/50 hover:shadow-2xl hover:-translate-y-2">
              <div className="relative p-6 overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500">
                <div className="absolute inset-0 transition-colors bg-black/10 group-hover:bg-black/0"></div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <h2 className="mb-1 text-2xl font-bold text-white drop-shadow-lg">Portfolio</h2>
                    <p className="text-sm text-white/80">Your investments</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Invested:</span>
                    <span className="text-xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">₹0</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Current Value:</span>
                    <span className="text-xl font-bold text-gray-800">₹0</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium text-gray-600">Gain/Loss:</span>
                    <span className="text-xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">₹0</span>
                  </div>
                </div>

                <a href="/portfolio">
                  <button className="flex items-center justify-center w-full py-3 mt-6 space-x-2 font-semibold text-white transition-all transform bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl hover:shadow-xl hover:scale-105">
                    <span>Go to Portfolio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            {/* Profile Card */}
            <div className="overflow-hidden transition-all duration-500 transform border shadow-xl group backdrop-blur-xl bg-white/60 rounded-3xl border-white/50 hover:shadow-2xl hover:-translate-y-2">
              <div className="relative p-6 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="absolute inset-0 transition-colors bg-black/10 group-hover:bg-black/0"></div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <h2 className="mb-1 text-2xl font-bold text-white drop-shadow-lg">Profile</h2>
                    <p className="text-sm text-white/80">Account settings</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <span className="text-base font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Demo User</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <span className="text-sm font-semibold text-gray-800">demo@gmail.com</span>
                  </div>
                </div>

                <a href="/profile">
                  <button className="flex items-center justify-center w-full py-3 mt-6 space-x-2 font-semibold text-white transition-all transform bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:shadow-xl hover:scale-105">
                    <span>Go to Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
            {/* Goal Progress Overview */}
            <div className="p-6 border shadow-xl backdrop-blur-xl bg-white/60 rounded-3xl border-white/50">
              <h3 className="mb-4 text-xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">Goal Progress Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
                  <div>
                    <p className="mb-1 text-sm text-white/80">Active Goals</p>
                    <p className="text-3xl font-bold text-white">0</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                    <Target className="text-white w-7 h-7" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-5 shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                  <div>
                    <p className="mb-1 text-sm text-white/80">Completed Goals</p>
                    <p className="text-3xl font-bold text-white">0</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                    <Target className="text-white w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="p-6 border shadow-xl backdrop-blur-xl bg-white/60 rounded-3xl border-white/50">
              <h3 className="mb-4 text-xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text">Portfolio Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <div>
                    <p className="mb-1 text-sm text-white/80">Total Holdings</p>
                    <p className="text-3xl font-bold text-white">0</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                    <Briefcase className="text-white w-7 h-7" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-5 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
                  <div>
                    <p className="mb-1 text-sm text-white/80">Return Rate</p>
                    <p className="text-3xl font-bold text-white">0%</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                    <TrendingUp className="text-white w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}