export default function GoalList() {
  // Dummy goals data
  const goals = [
    {
      id: 1,
      name: "Buy a New Car",
      targetAmount: 500000,
      currentAmount: 150000,
      deadline: "2025-12-31",
      category: "Vehicle",
      progress: 30
    },
    {
      id: 2,
      name: "Emergency Fund",
      targetAmount: 300000,
      currentAmount: 180000,
      deadline: "2025-06-30",
      category: "Savings",
      progress: 60
    },
    {
      id: 3,
      name: "Vacation to Europe",
      targetAmount: 200000,
      currentAmount: 50000,
      deadline: "2026-03-15",
      category: "Travel",
      progress: 25
    },
    {
      id: 4,
      name: "Home Down Payment",
      targetAmount: 1000000,
      currentAmount: 400000,
      deadline: "2026-12-31",
      category: "Real Estate",
      progress: 40
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Vehicle': 'bg-purple-100 text-purple-700',
      'Savings': 'bg-green-100 text-green-700',
      'Travel': 'bg-blue-100 text-blue-700',
      'Real Estate': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">My Goals</h1>
            <p className="text-gray-600">Track and manage your financial goals</p>
          </div>
          <button className="px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            + Add New Goal
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="mb-1 text-sm text-gray-600">Total Goals</p>
            <p className="text-3xl font-bold text-gray-800">{goals.length}</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="mb-1 text-sm text-gray-600">Total Target</p>
            <p className="text-3xl font-bold text-gray-800">
              {formatCurrency(goals.reduce((sum, goal) => sum + goal.targetAmount, 0))}
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="mb-1 text-sm text-gray-600">Total Saved</p>
            <p className="text-3xl font-bold text-gray-800">
              {formatCurrency(goals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="mb-1 text-sm text-gray-600">Avg Progress</p>
            <p className="text-3xl font-bold text-gray-800">
              {Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)}%
            </p>
          </div>
        </div>

        {/* Goals List */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {goals.map((goal) => (
            <div key={goal.id} className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
              {/* Goal Header */}
              <div className="mb-4">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">{goal.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                  {goal.category}
                </span>
              </div>

              {/* Amount Info */}
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Amount</span>
                  <span className="text-lg font-bold text-blue-600">{formatCurrency(goal.currentAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Target Amount</span>
                  <span className="text-lg font-bold text-gray-800">{formatCurrency(goal.targetAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Remaining</span>
                  <span className="text-lg font-bold text-orange-600">
                    {formatCurrency(goal.targetAmount - goal.currentAmount)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-bold text-gray-800">{goal.progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div 
                    className={`h-3 rounded-full transition-all ${getProgressColor(goal.progress)}`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  📅 Deadline: {formatDate(goal.deadline)}
                </span>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no goals) */}
        {goals.length === 0 && (
          <div className="p-12 text-center bg-white rounded-lg shadow">
            <div className="mb-4 text-6xl">🎯</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">No Goals Yet</h3>
            <p className="mb-6 text-gray-600">Start by creating your first financial goal</p>
            <button className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
              Create Your First Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}