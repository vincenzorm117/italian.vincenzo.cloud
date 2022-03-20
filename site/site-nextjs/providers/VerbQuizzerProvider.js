import { createContext, useContext } from "react";
import { QuizServiceFactory } from "../services/QuizService";

const quizContext = createContext(QuizServiceFactory());

export default quizContext;

export const useQuizContext = () => {
  return useContext(quizContext);
};
