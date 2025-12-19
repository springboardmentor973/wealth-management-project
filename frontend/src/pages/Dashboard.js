export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Personalized Wealth Management & Goal Tracker
          </h1>
          <p className="text-gray-600">Welcome to your financial overview</p>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Goals Card */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Goals</h2>
            
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Goals:</span>
                <span className="text-lg font-semibold text-gray-800">0</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Target:</span>
                <span className="text-lg font-semibold text-gray-800">₹0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Progress:</span>
                <span className="text-lg font-semibold text-gray-800">0%</span>
              </div>
            </div>

            <a href="/goals">
              <button className="w-full py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Go to Goals
              </button>
            </a>
          </div>

          {/* Portfolio Card */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Portfolio</h2>
            
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Invested:</span>
                <span className="text-lg font-semibold text-gray-800">₹0</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Current Value:</span>
                <span className="text-lg font-semibold text-gray-800">₹0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Gain/Loss:</span>
                <span className="text-lg font-semibold text-gray-800">₹0</span>
              </div>
            </div>

            <a href="/portfolio">
              <button className="w-full py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700">
                Go to Portfolio
              </button>
            </a>
          </div>

          {/* Profile Card */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Profile</h2>
            
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Name:</span>
                <span className="text-base font-semibold text-gray-800">Demo User</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Email:</span>
                <span className="text-sm font-semibold text-gray-800">demo@gmail.com</span>
              </div>
            </div>

            <a href="/profile">
              <button className="w-full py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700">
                Go to Profile
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}