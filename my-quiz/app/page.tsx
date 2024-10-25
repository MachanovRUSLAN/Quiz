"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setCategories } from "./reduxTolkit/createSlice";
import { RootState } from "./reduxTolkit/store";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask,
  faCalculator,
  faLandmark,
  faQuestionCircle,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Home() {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.quiz.categories);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  ); // Track selected category

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["quiz"],
    queryFn: () =>
      fetch("http://localhost:3000/categories").then((res) => res.json()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (data) {
    dispatch(setCategories(data));
  }

  // Update the body background color based on the current mode
  document.body.style.backgroundColor = isDarkMode ? "#1A202C" : "#FFFFFF"; // Dark mode background
  document.body.style.color = isDarkMode ? "#FFFFFF" : "#000000"; // Text color based on mode
  document.body.style.transition = "0.3s"; //Mode transition

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId); // Set the selected category ID
  };

  const handleStartQuiz = () => {
    if (selectedCategoryId !== null) {
      dispatch(selectCategory(selectedCategoryId)); // Dispatch selected category
    }
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "General Knowledge":
        return faQuestionCircle;
      case "Science":
        return faFlask;
      case "Math":
        return faCalculator;
      case "History":
        return faLandmark;
      case "Geography":
        return faGlobe;
      default:
        return faQuestionCircle;
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen relative ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {/* Toggle switch for Dark Mode */}
      <div className="absolute top-4 right-6">
        <Switch
          colorScheme="blue"
          size="lg"
          checked={isDarkMode}
          onChange={handleToggle}
          aria-label="click and change dark or light moode"
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

      {/* Main content */}
      <div className="grid lg:grid-cols-12 grid-cols-6  lg:w-3/4 w-[100%] lg:h-[60%] h-auto">
        <div className="col-span-6 md:col-span-6 p-5">
          <h1
            className={`lg:flex flex-col hidden text-5xl ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Welcome to the
            <br />
            <span className="font-bold">Frontend Quiz!</span>
          </h1>
          <p
            className={`font-serif mt-5 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Pick a Subject to get started
          </p>
        </div>

        {/* Category List */}
        <div className="col-span-6 md:col-span-6">
          {categories.map((category) => {
            const icon = getCategoryIcon(category.name);
            return (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`lg:p-5 p-5 lg:w-[100%] w-[90%] m-auto my-5 flex justify-start items-center rounded-lg border cursor-pointer transition-all ${
                  isDarkMode ? "border-white" : "border-black"
                } ${
                  selectedCategoryId === category.id
                    ? "bg-blue-500 text-white" // Change background color when selected
                    : isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                <span className="text-xl">
                  <FontAwesomeIcon icon={icon} />
                </span>
                <span
                 area-label={`Categories ${category.name}`}
                  className="pl-2"
                  
                >
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Start Quiz Button */}
      </div>
      {selectedCategoryId && (
        <Link href="/Quiz">
          <button
          aria-label="click start button and start your quiz"
            className={`w-[200px]  h-[50px] rounded-md text-white font-bold m-auto mt-6  ${
              isDarkMode ? "bg-blue-600" : "bg-red-700"
            }`}
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        </Link>
      )}
    </div>
  );
}
