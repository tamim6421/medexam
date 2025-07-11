import { IMAGE_URL } from "@/lib/api";

const QuestionImage = ({ image, title }) => (
  <div className="mb-6">
    <img
      src={`${IMAGE_URL}/${image}`}
      alt={title || "Question"}
      className="w-full max-w-md mx-auto rounded-lg shadow-md border border-emerald-100"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  </div>
);

export default QuestionImage; 