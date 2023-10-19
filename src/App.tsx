import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// Components
import { QuestionCard } from "./components/QuestionCard";
// types
import { QuestionsState, Difficulty } from "./API";

import { GlobalStyle, Wrapper } from "./App.styles";

export type Answerobject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setloading] = useState(false);
  const [questions, setquestions] = useState<QuestionsState[]>([]);
  const [number, setnumber] = useState(0);
  const [userAnswers, setuserAnswers] = useState<Answerobject[]>([]);
  const [score, setscore] = useState(0);
  const [gameOver, setgameOver] = useState(true);

  const startQuiz = async () => {
    setloading(true);
    setgameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setquestions(newQuestions);
    setscore(0);
    setuserAnswers([]);
    setnumber(0);
    setloading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setscore((prev) => prev + 1);

      const Answerobject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setuserAnswers((prev) => [...prev, Answerobject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setgameOver(true);
    } else {
      setnumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>MOJA Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions ...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            Question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
