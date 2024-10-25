"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  resetQuiz,
  selectAnswer,
} from "../reduxTolkit/createSlice";
import { RootState } from "../reduxTolkit/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Quiz() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { selectedCategory, currentQuestionIndex, feedBack } = useSelector(
    (state: RootState) => state.quiz
  );

  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
  const [answered, setAnswered] = useState(false); // Track whether the user has answered

  const { register, handleSubmit, watch, reset } = useForm(); // React Hook Form setup

  const selectedOption = watch("answer"); // Watch the selected answer

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode
  };

  const handleAnswerClick = (option: string) => {
    if (!answered) {
      reset({ answer: option }); // Set the selected answer  React Hook Form
    }
  };

  const onSubmit = () => {
    if (!selectedOption) {
      alert("Please select a answer"); // Show alert if no answer is selected
      return;
    }

    // Dispatch the selected answer and mark that the user has answered
    dispatch(selectAnswer(selectedOption));
    setAnswered(true);
  };

  const handleNextClick = () => {
    // Proceed to the next question after feedback
    if (
      selectedCategory &&
      currentQuestionIndex >= selectedCategory.questions.length - 1
    ) {
      router.push("/Quiz/Score"); // Navigate to the score page if it's the last question
    } else {
      dispatch(nextQuestion());
      reset({ answer: null }); // Clear the selected option for the next question
      setAnswered(false); // Reset answered state for the next question
    }
  };

  if (!selectedCategory) {
    return (
      <div>
        <a href="/">Please go back and select a category.</a>
      </div>
    );
  }

  if (!selectedCategory.questions || selectedCategory.questions.length === 0) {
    return <div>No questions available for this category.</div>;
  }

  const currentQuestion = selectedCategory.questions[currentQuestionIndex];

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-all ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* Dark/Light mode switch */}
      <div className="absolute top-4 right-6">
        <Switch
          aria-label="change mood dark or light"
          colorScheme="blue"
          size="lg"
          checked={isDarkMode}
          onChange={handleToggle}
          trackLabel={{
            on: (
              <Icon color="yellow.400">
                <FaSun />
              </Icon>
            ),
            off: (
              <Icon color="gray.400">
                <FaMoon />
              </Icon>
            ),
          }}
        />
      </div>

      <div className="p-6 rounded-lg shadow-lg lg:w-3/4">
        <p className="text-2xl font-semibold">
          Question {currentQuestionIndex + 1}/
          {selectedCategory.questions.length}
        </p>
        <h2 className="mt-4 text-3xl">{currentQuestion.question}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {currentQuestion.options.map((option: string) => {
            let BackgorundColorClass = "bg-white";
            if (answered) {
              if (option === currentQuestion.answer) {
                BackgorundColorClass = "bg-green-500"; // Correct answer
              } else if (option === selectedOption) {
                BackgorundColorClass = "bg-red-500"; // Incorrect answer
              }
            } else if (selectedOption === option) {
              BackgorundColorClass = "bg-blue-400"; // Highlight selected option
            }

            return (
              <div key={option} className="mb-4">
                <button
                  type="button"
                  onClick={() => handleAnswerClick(option)} // Select the answer
                  className={`w-full p-4 rounded-lg border  ${
                    answered ? "cursor-not-allowed" : "cursor-pointer"
                  } ${BackgorundColorClass} ${
                    isDarkMode
                      ? "bg-gray-600 text-black border-white"
                      : "bg-gray-200 text-black border-black"
                  }`}
                  aria-label={`option ${option}`}
                  disabled={answered} // Disable buttons after the answer is submitted
                >
                  {option}
                </button>
              </div>
            );
          })}

          {/* Submit Answer button */}
          {!answered && (
            <button
            aria-label="be sure before you choose any option or not if you choose any option click submit answer and go to next question"
              type="submit"
              className={`w-full p-3 mt-4 text-lg font-semibold rounded-lg ${
                isDarkMode ? "bg-blue-500" : "bg-blue-700 text-white"
              }`}
            >
              Submit Answer
            </button>
          )}
        </form>

        {/* Next Question or Finish Quiz button */}
        {answered && (
          <button
            onClick={handleNextClick}
            className={`w-full p-3 mt-4 text-lg font-semibold rounded-lg  ${
              isDarkMode ? "bg-green-500 text-white" : "bg-green-700 text-white"
            }`}
          >
            {currentQuestionIndex >= selectedCategory.questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}
