import { Target, Calendar, DollarSign, TrendingUp, Plus, ArrowRight, Sparkles } from 'lucide-react';

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
      progress: 30,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Emergency Fund",
      targetAmount: 300000,
      currentAmount: 180000,
      deadline: "2025-06-30",
      category: "Savings",
      progress: 60,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "Vacation to Europe",
      targetAmount: 200000,
      currentAmount: 50000,
      deadline: "2026-03-15",
      category: "Travel",
      progress: 25,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      name: "Home Down Payment",
      targetAmount: 1000000,
      currentAmount: 400000,
      deadline: "2026-12-31",
      category: "Real Estate",
      progress: 40,
      gradient: "from-orange-500 to-red-500"
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

  const getProgressGradient = (progress) => {
    if (progress >= 75) return 'from-green-400 to-emerald-500';
    if (progress >= 50) return 'from-blue-400 to-indigo-500';
    if (progress >= 25) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-purple-300 rounded-full -top-40 -right-40 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bg-blue-300 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-pink-300 rounded-full top-1/2 left-1/2 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative p-6 mx-auto max-w-7xl">
        {/* Modern Header with Glass Effect */}
        <div className="p-8 mb-8 border shadow-2xl backdrop-blur-xl bg-white/40 rounded-3xl border-white/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text">
                  My Financial Goals
                </h1>
                <p className="text-lg text-gray-600">Track your dreams, achieve your targets</p>
              </div>
            </div>
            <button className="relative px-8 py-4 overflow-hidden text-white transition-all duration-300 transform group bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:shadow-2xl hover:scale-105">
              <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:opacity-100"></div>
              <div className="relative flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span className="font-semibold">Create Goal</span>
              </div>
            </button>
          </div>
        </div>

        {/* Modern Stats Grid with Glass Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          {[
            { label: 'Total Goals', value: goals.length, icon: Target, gradient: 'from-blue-500 to-cyan-500' },
            { label: 'Total Target', value: formatCurrency(goals.reduce((sum, goal) => sum + goal.targetAmount, 0)), icon: DollarSign, gradient: 'from-green-500 to-emerald-500' },
            { label: 'Total Saved', value: formatCurrency(goals.reduce((sum, goal) => sum + goal.currentAmount, 0)), icon: TrendingUp, gradient: 'from-purple-500 to-pink-500' },
            { label: 'Avg Progress', value: `${Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)}%`, icon: Calendar, gradient: 'from-orange-500 to-red-500' }
          ].map((stat, idx) => (
            <div key={idx} className="p-6 transition-all duration-300 transform border shadow-xl group backdrop-blur-xl bg-white/60 rounded-2xl border-white/50 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Modern Goal Cards with Glassmorphism */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {goals.map((goal) => (
            <div 
              key={goal.id} 
              className="overflow-hidden transition-all duration-500 transform border shadow-xl group backdrop-blur-xl bg-white/60 rounded-3xl border-white/50 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${goal.gradient} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 transition-colors bg-black/10 group-hover:bg-black/0"></div>
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-white drop-shadow-lg">{goal.name}</h3>
                    <span className="inline-block bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold text-white">
                      {goal.category}
                    </span>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                    <Target className="text-white w-7 h-7" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Amount Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="mb-1 text-xs tracking-wide text-gray-500 uppercase">Current</p>
                    <p className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
                      {formatCurrency(goal.currentAmount)}
                    </p>
                  </div>
                  <div className="text-center border-gray-200 border-x">
                    <p className="mb-1 text-xs tracking-wide text-gray-500 uppercase">Target</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="mb-1 text-xs tracking-wide text-gray-500 uppercase">Remaining</p>
                    <p className="text-lg font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                      {formatCurrency(goal.targetAmount - goal.currentAmount)}
                    </p>
                  </div>
                </div>

                {/* Modern Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Progress</span>
                    <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="relative w-full h-4 overflow-hidden bg-gray-200 rounded-full">
                    <div 
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getProgressGradient(goal.progress)} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      style={{ width: `${goal.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{formatDate(goal.deadline)}</span>
                  </div>
                  <button className="flex items-center space-x-2 text-sm font-semibold text-blue-600 transition-colors group/btn hover:text-purple-600">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="p-16 text-center border shadow-2xl backdrop-blur-xl bg-white/60 rounded-3xl border-white/50">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h3 className="mb-3 text-3xl font-bold text-gray-800">Start Your Journey</h3>
            <p className="mb-8 text-lg text-gray-600">Create your first financial goal and watch your dreams come true</p>
            <button className="px-8 py-4 text-white transition-all transform bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:shadow-2xl hover:scale-105">
              Create Your First Goal
            </button>
          </div>
        )}
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