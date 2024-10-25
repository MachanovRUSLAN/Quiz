import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./createSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("quizsTATE",JSON.stringify(state.quiz));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
