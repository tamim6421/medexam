const ErrorDisplay = ({ error, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
    <div className="text-center space-y-4">
      <div className="text-6xl">⚠️</div>
      <div className="text-lg text-red-500 font-medium">{error}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

export default ErrorDisplay; 