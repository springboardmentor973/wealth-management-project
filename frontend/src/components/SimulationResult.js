export default function SimulationResult({ result }) {
  // Dummy data for testing
  const dummyResult = {
    projected_value: 525000,
    duration_months: 36,
    target_amount: 500000,
    monthly_contribution: 12000,
    expected_return: 8,
    success: true,
    message: "Great news! Your goal is achievable with consistent contributions."
  };

  // Use provided result or dummy data
  const displayResult = result || dummyResult;
  
  // If explicitly no result and no dummy needed
  if (result === null) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <div className="mb-4 text-6xl">📊</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-800">No Simulation Yet</h3>
        <p className="text-gray-600">Run a simulation to see the results here</p>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDuration = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  const isSuccess = displayResult.success !== false;

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
      {/* Header with Success/Failure Indicator */}
      <div className={`${isSuccess ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Simulation Results</h2>
            <p className="text-white/90">
              {isSuccess ? '✅ Goal Achievable!' : '⚠️ Goal May Be Challenging'}
            </p>
          </div>
          <div className="text-5xl">
            {isSuccess ? '🎯' : '📊'}
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="p-6 space-y-6">
        {/* Success/Warning Message */}
        <div className={`${isSuccess ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'} border-2 rounded-lg p-4`}>
          <h3 className={`font-semibold mb-2 ${isSuccess ? 'text-green-800' : 'text-orange-800'}`}>
            {displayResult.message || (isSuccess ? 'Great news! Your goal is achievable.' : 'Your goal may require adjustments.')}
          </h3>
          <p className={`text-sm ${isSuccess ? 'text-green-700' : 'text-orange-700'}`}>
            {isSuccess 
              ? 'Based on your monthly contribution and expected returns, you should reach your goal on time.'
              : 'Consider increasing your monthly contribution or adjusting your target amount.'}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Projected Value */}
          <div className="p-5 border border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="mb-1 text-sm text-gray-600">Projected Value</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(displayResult.projected_value || displayResult.projectedValue || 0)}
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Expected amount at the end of the period
            </p>
          </div>

          {/* Duration */}
          <div className="p-5 border border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="mb-1 text-sm text-gray-600">Time Duration</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatDuration(displayResult.duration_months || displayResult.durationMonths || 0)}
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Time needed to reach your goal
            </p>
          </div>
        </div>

        {/* Additional Details */}
        {displayResult.target_amount && (
          <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="mb-3 font-semibold text-gray-800">Goal Details</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="mb-1 text-xs text-gray-500">Target Amount</p>
                <p className="text-lg font-bold text-gray-800">
                  {formatCurrency(displayResult.target_amount || displayResult.targetAmount || 0)}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">Monthly Contribution</p>
                <p className="text-lg font-bold text-gray-800">
                  {formatCurrency(displayResult.monthly_contribution || displayResult.monthlyContribution || 0)}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">Expected Returns</p>
                <p className="text-lg font-bold text-gray-800">
                  {displayResult.expected_return || displayResult.expectedReturn || 0}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        {displayResult.target_amount && displayResult.projected_value && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Goal Achievement</span>
              <span className="text-sm font-bold text-gray-800">
                {Math.min(Math.round((displayResult.projected_value / displayResult.target_amount) * 100), 100)}%
              </span>
            </div>
            <div className="w-full h-4 overflow-hidden bg-gray-200 rounded-full">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${
                  isSuccess ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-orange-400 to-red-500'
                }`}
                style={{ 
                  width: `${Math.min(Math.round((displayResult.projected_value / displayResult.target_amount) * 100), 100)}%` 
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button className="flex-1 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            Save Simulation
          </button>
          <button className="flex-1 py-3 font-medium text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300">
            Run New Simulation
          </button>
        </div>
      </div>
    </div>
  );
}