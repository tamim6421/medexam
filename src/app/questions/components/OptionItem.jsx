const OptionItem = ({ option, isSelected, isSubmitted, isCorrect, onSelect }) => {
  const getOptionStyle = () => {
    if (isSubmitted) {
      if (isCorrect) return "bg-green-50 border-green-500 text-green-800";
      if (isSelected && !isCorrect) return "bg-red-50 border-red-500 text-red-800";
      return "bg-gray-50 border-gray-300 text-gray-600";
    }
    return isSelected 
      ? "bg-emerald-50 border-emerald-500 text-emerald-800" 
      : "bg-white hover:bg-emerald-50 border-gray-200 hover:border-emerald-300";
  };

  const getIcon = () => {
    if (!isSubmitted) return null;
    if (isCorrect) return "✅";
    if (isSelected && !isCorrect) return "❌";
    return null;
  };

  return (
    <label
      className={`flex items-center border-2 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${getOptionStyle()}`}
    >
      <input
        type="radio"
        checked={isSelected}
        disabled={isSubmitted}
        onChange={() => !isSubmitted && onSelect(option.id)}
        className="sr-only"
      />
      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
        ${isSelected 
          ? "bg-emerald-600 border-emerald-600" 
          : "border-gray-300"
        }`}
      >
        {isSelected && (
          <div className="w-2 h-2 bg-white rounded-full"></div>
        )}
      </div>
      <span className="flex-1">{option.option}</span>
      {getIcon() && <span className="ml-2 text-lg">{getIcon()}</span>}
    </label>
  );
};

export default OptionItem; 