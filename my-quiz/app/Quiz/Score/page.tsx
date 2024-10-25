"use client";

import { useRouter } from "next/navigation";
import { RootState } from "../../reduxTolkit/store";
import { useSelector } from "react-redux";
import "./score.css";

function Score() {
  const router = useRouter();

  const { score } = useSelector((state: RootState) => state.quiz);

  return (
    <div className="flex flex-col justify-center items-center w-[100%] h-[100vh]">
      <div className="w-2/4 h-3/4 flex flex-col justify-center items-center">
        <div className="size-2/5 lg:w-[50%] w-[100%] lg:h-3/4 fadeIn">
          <img
          //fadeIn is animation go to score.css file
            className="fadeIn w-[100%]"
            src="https://cdn-icons-png.flaticon.com/512/7960/7960328.png"
            alt=""
          />
        </div>
        <h1 className="lg:text-5xl font-bold">Your Score</h1>
        <p className="text-4xl my-3  fadeIn" aria-label="your  score is">{score}</p>
        <button
          className="p-2 bg-red-400 rounded-md font-bold"
          onClick={() => router.push("/")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Score;
