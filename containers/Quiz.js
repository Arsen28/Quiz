import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuiz from "../components/ActiveQuiz";
import Finished from '../components/FinishedQuiz/FinishQuiz'

class Quiz extends Component {
  state = {
    isFinished:false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: "What color ocean",
        rightAswer: 1,
        answers: [
          { text: "Yellow", id: 0 },
          { text: "Blue  ", id: 1 },
          { text: "Black", id: 2 },
          { text: "Green", id: 3 }  
        ]
      },
      {
        question: "Which year did they found Saint-Peterburg ?",
        rightAswer: 2,
        answers: [
          { text: "1700", id: 0 },
          { text: "1701  ", id: 1 },  
          { text: "1703", id: 2 },
          { text: "1802", id: 3 }
        ]
      },
      {
        question: "Which year  build Moscow   ?",
        rightAswer: 2,
        answers: [
          { text: "1247", id: 0 },
          { text: "1148  ", id: 1 },
          { text: "1147", id: 2 },
          { text: "1250", id: 3 }
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAswer === answerId) {
      this.setState({
        answerState: { [answerId]: "success" }
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinish()) {
          this.setState({
            isFinished:true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: "error" }
      });
    }
  };

  isQuizFinish() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className="Quiz">
        <div className="QuizWrapper">
          <h1>Quiz</h1>

          {
            this.state.isFinished
            ?
            <Finished>
              
            </Finished>
            :
            <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
          }
        </div>
      </div>
    );
  }
}

export default Quiz;
