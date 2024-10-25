import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Question = {
  id: number;
  question: string;
  options: any;
  answer: string;
};

type Category = {
  id: number;
  name: string;
  questions: Question[];
};

type QuizState = {
  categories: Category[];
  selectedCategory: Category | null;
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  feedBack: "correct" | "incorrect" | null;
};

const initialState: QuizState = {
  categories: [],
  selectedCategory: null,
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswer: null,
  feedBack: null,
};

const saveToLocalStorage = (state: QuizState) => {
  localStorage.setItem("quizState", JSON.stringify(state));
};

const Slice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    selectCategory(state, action: PayloadAction<number>) {
      const category = state.categories.find(
        (cat) => cat.id === action.payload
      );
      if (category) {
        state.selectedCategory = category;
        state.score = 0;
        state.currentQuestionIndex = 0;
        state.selectedAnswer = null;
        state.feedBack = null;
      }
      saveToLocalStorage(state);
    },
    selectAnswer(state, action: PayloadAction<string>) {
      state.selectedAnswer = action.payload;
      const currentQuestion =
        state.selectedCategory?.questions[state.currentQuestionIndex];
      if (currentQuestion?.answer === action.payload) {
        state.score += 1;
        state.feedBack = "correct";
      } else {
        state.feedBack = "incorrect";
      }
      saveToLocalStorage(state);
    },
    nextQuestion(state) {
      if (
        state.selectedCategory &&
        // Ensure questions array exists
        state.currentQuestionIndex < state.selectedCategory.questions.length - 1 // Access safely
      ) {
        state.currentQuestionIndex += 1;
        state.feedBack = null;
        state.selectedAnswer = null;
      }
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.selectedAnswer = null;
      state.selectedCategory = null;
      state.score = 0;
      state.feedBack = null;
    },
  },
});

export const {
  setCategories,
  selectAnswer,
  nextQuestion,
  selectCategory,
  resetQuiz,
} = Slice.actions;
export default Slice.reducer;
