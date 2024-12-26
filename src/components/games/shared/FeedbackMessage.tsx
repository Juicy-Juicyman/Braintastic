import React from "react";

interface FeedbackMessageProps {
  feedback: string;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ feedback }) => {
  if (!feedback) return null;

  const isCorrect = feedback.includes("Correct");
  const textColor = isCorrect ? "text-green-600" : "text-red-600";

  return (
    <p
      className={`mt-6 text-center text-lg sm:text-xl font-semibold ${textColor}`}
    >
      {feedback}
    </p>
  );
};

export default FeedbackMessage;
