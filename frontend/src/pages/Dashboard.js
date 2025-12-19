export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Personalized Wealth Management & Goal Tracker
          </h1>
          <p className="text-gray-600">Welcome to your financial overview</p>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Goals Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Goals</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Goals:</span>
                <span className="text-lg font-semibold text-gray-800">0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Target:</span>
                <span className="text-lg font-semibold text-gray-800">₹0</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Progress:</span>
                <span className="text-lg font-semibold text-gray-800">0%</span>
              </div>
            </div>

            <a href="/goals">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Go to Goals
              </button>
            </a>
          </div>

          {/* Portfolio Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Portfolio</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Invested:</span>
                <span className="text-lg font-semibold text-gray-800">₹0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Current Value:</span>
                <span className="text-lg font-semibold text-gray-800">₹0</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Gain/Loss:</span>
                <span className="text-lg font-semibold text-gray-800">₹0</span>
              </div>
            </div>

            <a href="/portfolio">
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Go to Portfolio
              </button>
            </a>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Name:</span>
                <span className="text-base font-semibold text-gray-800">Demo User</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Email:</span>
                <span className="text-sm font-semibold text-gray-800">demo@gmail.com</span>
              </div>
            </div>

            <a href="/profile">
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Go to Profile
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}