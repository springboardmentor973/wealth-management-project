import { useState, useEffect } from 'react';

export default function GoalList() {
  // Dummy goals data (fallback if API fails)
  const dummyGoals = [
    {
      id: 1,
      name: "Buy a New Car",
      target_amount: 500000,
      current_amount: 150000,
      deadline: "2025-12-31",
      category: "Vehicle"
    },
    {
      id: 2,
      name: "Emergency Fund",
      target_amount: 300000,
      current_amount: 180000,
      deadline: "2025-06-30",
      category: "Savings"
    },
    {
      id: 3,
      name: "Vacation to Europe",
      target_amount: 200000,
      current_amount: 50000,
      deadline: "2026-03-15",
      category: "Travel"
    },
    {
      id: 4,
      name: "Home Down Payment",
      target_amount: 1000000,
      current_amount: 400000,
      deadline: "2026-12-31",
      category: "Real Estate"
    }
  ];

  const [goals, setGoals] = useState(dummyGoals);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch goals from backend
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/goals', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch goals');
      }

      const data = await response.json();
      
      // Use real data if available, otherwise keep dummy data
      if (data && data.length > 0) {
        setGoals(data);
      }
      setError(null);
    } catch (err) {
      // Keep dummy data if API fails
      console.log('Using dummy data - API not available:', err.message);
      setError(null); // Don't show error, just use dummy data
    } finally {
      setLoading(false);
    }
  };

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

  // Calculate progress percentage
  const calculateProgress = (currentAmount, targetAmount) => {
    if (targetAmount === 0) return 0;
    const progress = (currentAmount / targetAmount) * 100;
    return Math.min(Math.round(progress), 100); // Cap at 100%
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
      'Real Estate': 'bg-orange-100 text-orange-700',
      'Education': 'bg-indigo-100 text-indigo-700',
      'Investment': 'bg-teal-100 text-teal-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  // Calculate totals
  const totalTarget = goals.reduce((sum, goal) => sum + (goal.target_amount || 0), 0);
  const totalSaved = goals.reduce((sum, goal) => sum + (goal.current_amount || 0), 0);
  const avgProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, goal) => sum + calculateProgress(goal.current_amount, goal.target_amount), 0) / goals.length)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-b-4 border-blue-600 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">Loading your goals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
          <div className="mb-4 text-6xl">⚠️</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Error Loading Goals</h3>
          <p className="mb-6 text-gray-600">{error}</p>
          <button 
            onClick={fetchGoals}
            className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
              {formatCurrency(totalTarget)}
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="mb-1 text-sm text-gray-600">Total Saved</p>
            <p className="text-3xl font-bold text-gray-800">
              {formatCurrency(totalSaved)}
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="mb-1 text-sm text-gray-600">Avg Progress</p>
            <p className="text-3xl font-bold text-gray-800">{avgProgress}%</p>
          </div>
        </div>

        {/* Goals List */}
        {goals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {goals.map((goal) => {
              const progress = calculateProgress(goal.current_amount, goal.target_amount);
              
              return (
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
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(goal.current_amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Target Amount</span>
                      <span className="text-lg font-bold text-gray-800">
                        {formatCurrency(goal.target_amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Remaining</span>
                      <span className="text-lg font-bold text-orange-600">
                        {formatCurrency(goal.target_amount - goal.current_amount)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-gray-800">{progress}%</span>
                    </div>
                    <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                        style={{ width: `${progress}%` }}
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
              );
            })}
          </div>
        ) : (
          /* Empty State */
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