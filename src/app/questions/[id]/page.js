"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { apiService } from "@/lib/api";
import { useEndpoints } from "@/lib/endPoints";
import { toast } from "sonner";
import {
  LoadingSpinner,
  ErrorDisplay,
  PaginationSidebar,
  QuestionImage,
  OptionItem,
  ProgressBar
} from "../components";

export default function QuestionPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const slot_id = searchParams.get("slot_id");
  const course_id = searchParams.get("course_id");
  const router = useRouter();
  const { QUESTION_ENDPOINTS } = useEndpoints();

  // State management
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [answeredPages, setAnsweredPages] = useState([]);

  // Memoized values
  const currentQuestion = useMemo(() => questionData?.data?.[0], [questionData]);
  const isSubmitted = useMemo(() => currentQuestion?.submit_status === 1, [currentQuestion]);
  const submittedOptionId = useMemo(() => 
    isSubmitted ? String(currentQuestion?.answer_option_id || "") : null, 
    [isSubmitted, currentQuestion]
  );

  // Fetch question data
  const fetchQuestion = useCallback(async () => {
    if (!id || !course_id) return;
    
    setLoading(true);
    setError("");
    setSelectedOption(null);
    
    try {
      const endpoint = QUESTION_ENDPOINTS.getSlotList(course_id, id, currentPage);
      const response = await apiService.get(endpoint);
      const data = response.data;
      
      if (Array.isArray(data.data) && data.data.length > 0) {
        setQuestionData(data);
        setTotalPages(data.last_page || 1);
        
        // Update answered pages
        if (data.data[0]?.submit_status === 1) {
          setAnsweredPages(prev => 
            prev.includes(currentPage) ? prev : [...prev, currentPage]
          );
        }
      } else {
        setError("No question found for this slot.");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      setError("Failed to load question. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id, course_id, currentPage]);

  // Handle option selection
  const handleOptionSelect = useCallback((optionId) => {
    if (!isSubmitted) {
      setSelectedOption(String(optionId));
    }
  }, [isSubmitted]);

  // Handle page navigation
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    router.replace(
      `/questions/${id}?slot_id=${slot_id}&course_id=${course_id}&page=${page}`
    );
  }, [id, slot_id, course_id, router]);

  // Handle answer submission
  const handleSubmitAnswer = useCallback(async (e) => {
    e.preventDefault();
    
    if (!selectedOption || isSubmitted || submitting) return;
    
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("option_id", Number(selectedOption));
      formData.append("slot_id", Number(currentQuestion?.id));

      const response = await apiService.post(
        QUESTION_ENDPOINTS.submitAnswer(course_id),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const data = response.data;
      
      if (data.message) {
        toast.success(data.message);
        setAnsweredPages(prev => 
          prev.includes(currentPage) ? prev : [...prev, currentPage]
        );
        
        // Refresh question data to show correct answer
        setTimeout(() => {
          fetchQuestion();
        }, 1000);
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Failed to submit answer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [selectedOption, isSubmitted, submitting, currentQuestion, course_id, QUESTION_ENDPOINTS, currentPage, fetchQuestion]);

  // Fetch question on mount and page change
  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchQuestion} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Pagination Sidebar */}
          <PaginationSidebar
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            answeredPages={answeredPages}
          />

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              {/* Progress Bar */}
              <ProgressBar current={answeredPages.length} total={totalPages} />
              
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Question {currentPage}
                  </h1>
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Slot {currentQuestion?.slot_number}
                  </div>
                </div>
                
                <div className="text-lg text-gray-700 leading-relaxed">
                  {currentQuestion?.question?.title}
                </div>
              </div>

              {/* Question Image */}
              {currentQuestion?.question?.image && (
                <QuestionImage 
                  image={currentQuestion.question.image} 
                  title={currentQuestion.question.title}
                />
              )}

              {/* Options Form */}
              <form onSubmit={handleSubmitAnswer}>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Select your answer:
                  </h3>
                  <div className="space-y-3">
                    {currentQuestion?.question?.options?.map((option) => {
                      const isSelected = isSubmitted 
                        ? submittedOptionId === String(option.id)
                        : selectedOption === String(option.id);
                      
                      const isCorrect = isSubmitted && option.is_correct;
                      
                      return (
                        <OptionItem
                          key={option.id}
                          option={option}
                          isSelected={isSelected}
                          isSubmitted={isSubmitted}
                          isCorrect={isCorrect}
                          onSelect={handleOptionSelect}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    disabled={!selectedOption || isSubmitted || submitting}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </span>
                    ) : isSubmitted ? (
                      "Answer Submitted ✓"
                    ) : (
                      "Submit Answer"
                    )}
                  </button>

                  {/* Navigation Buttons */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 transition"
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 transition"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </form>

              {/* Meta Information */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Category:</span>{" "}
                    {currentQuestion?.subsubcategory?.sub_sub_category_name}
                  </div>
                  <div>
                    <span className="font-semibold">Question ID:</span>{" "}
                    <span className="font-mono">{currentQuestion?.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}