import React from "react";
import { Answerobject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.style";
type QuestionProps = {
  Question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answerobject | undefined;
  questionNr: number;
  totalQuestions: number;
};

export const QuestionCard = ({
  Question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}: QuestionProps) => {
  return (
    <Wrapper>
      <p className="number">
        {" "}
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: Question }} />
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};
