const PaginationSidebar = ({ totalPages, currentPage, onPageChange, answeredPages }) => (
  <aside className="sticky top-24 self-start mr-8">
    <div className="bg-white rounded-xl shadow-lg border p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Questions</h3>
      <nav>
        <ul className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            const isActive = currentPage === page;
            const isAnswered = answeredPages.includes(page);
            
            return (
              <li key={page}>
                <button
                  onClick={() => onPageChange(page)}
                  className={`w-full h-10 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center
                    ${isActive 
                      ? "bg-emerald-600 text-white shadow-lg scale-105" 
                      : isAnswered 
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-2 border-emerald-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    {isAnswered && !isActive && <span className="text-emerald-600">✓</span>}
                    <span>Q {page}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-4 text-xs text-gray-500 text-center">
        {answeredPages.length}/{totalPages} completed
      </div>
    </div>
  </aside>
);

export default PaginationSidebar; 