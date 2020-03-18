import React, { Component } from "react";
import { qBank } from "./questionbnk";
import "./Quiz.css";
import { Redirect, withRouter } from "react-router-dom";
import bank from "./questionbnk/bank";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      questions: [],
      currentQuestion: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      userAnswer: "",
      options: [],
      correct: [],
      score: 0,
      showButton: true,
      disabledLi: true,
      previousButton: true,
      showFinishButton: false
    };
    this.interval = null;
  }

  componentDidMount() {
    this.startTimer();
    this.loadQuestions();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //Calling the react lifecycle for updates

  componentWillUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          questions: qBank[this.state.currentQuestion].question,
          options: qBank[this.state.currentQuestion].options,
          correct: qBank[this.state.currentQuestion].correct
        };
      });
    }
  }

  //Loading Question

  loadQuestions = () => {
    this.setState({
      questions: qBank[this.state.currentQuestion].question,
      options: qBank[this.state.currentQuestion].options,
      correct: qBank[this.state.currentQuestion].correct
    });
  };

  // The Next Hanndler function

  nextHandler = () => {
    const { score, userAnswer, correct } = this.state;
    const li = document.querySelectorAll("#lists");
    const button = document.querySelectorAll("#nextButton");

    li.forEach(lists => {
      lists.className = "";
    });

    button.forEach(list => {
      list.className = "btn btn-warning d-none";
    });

    this.setState({
      ...this.state,
      showButton: true,
      currentQuestion: this.state.currentQuestion + 1
    });
  };

  // Timer for the Quiz apromx 1m:20s
  startTimer = () => {
    const countdownTimer = Date.now() + 81000;
    this.interval = setInterval(() => {
      const now = new Date();
      // console.log(new Date(5001000));
      const distance = countdownTimer - now;
      const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              min: 0,
              secs: 0
            }
          },
          () => {
            this.endQuiz();
          }
        );
      } else {
        this.setState({
          time: {
            min,
            secs
          }
        });
      }
    }, 100);
  };

  // Function for terminate the quiz

  endQuiz = () => {
    alert("The Quiz has ended !");
    const scoreofquiz = {
      numberOfQuestion: qBank.length - 1,
      numberOfAnswered: this.state.correctAnswers,
      score: this.state.score,
      wrongAnswers: this.state.wrongAnswers
    };

    setTimeout(() => {
      this.props.history.push("/score", scoreofquiz);
    }, 1000);
  };

  // Function to option of the answer

  checkoption = answer => {
    this.setState({
      ...this.state,
      showButton: false,
      userAnswer: answer
    });
  };

  // Function for the submission

  submitHandler = e => {
    e.preventDefault();

    const confirmAnswer = window.confirm(
      `Are you sure about your answer? Otherwise, you will not be able to make corrections either navigate backward!`
    );
    if (!confirmAnswer) {
      return false;
    }

    const { userAnswer, correct } = this.state;
    const li = document.querySelectorAll("#lists");
    const button = document.querySelectorAll("#nextButton");

    this.setState({
      ...this.state,
      showButton: true
    });
    button.forEach(list => {
      list.className = "btn btn-warning";
      if (this.state.currentQuestion === qBank.length - 1) {
        list.className = "btn btn-warning d-none";
      }
    });

    li.forEach(list => {
      if (userAnswer !== correct && list.className === "selected") {
        list.className = "wrong disabled";
        this.setState(prevState => ({
          wrongAnswers: prevState.wrongAnswers + 1
        }));

        // this.setState({ score: 0 });
      } else if (userAnswer === correct && list.className === "selected") {
        list.className = "correct disabled";
        this.setState(prevState => ({
          score: prevState.score + 1,
          correctAnswers: prevState.correctAnswers + 1
        }));
      } else {
        list.className = "disabled";
      }
    });

    li.forEach(lists => {
      if (lists.textContent.toLowerCase() === correct) {
        lists.className = "correct disabled";
      }
    });

    if (this.state.currentQuestion === qBank.length - 1) {
      this.setState({ showFinishButton: true });
    }
  };

  render() {
    return (
      <>
        {/* {this.state.sample.length > 0 &&
          this.state.sample.map(({ question, options, correct }) => {
            return <p>{question}</p>;
          })} */}

        <div
          className="tm-content-container shadow-lg"
          data-test="quizzComponent"
        >
          <figure className="mb-0">
            <img src="img/img-1.jpg" alt="Image" className="img-fluid tm-img" />
          </figure>

          <div className="tm-content">
            <p
              className="tm-page-title shadow-lg"
              style={{ width: "92px", borderRadius: "18px" }}
            >
              {" "}
              <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
              {` ${this.state.time.min} : ${this.state.time.secs}`}
            </p>
            <span className="questspan">
              {" "}
              {`Question ${this.state.currentQuestion +
                1} out of ${qBank.length - 1 + 1}`}{" "}
            </span>
            <br /> <br />
            <p className="mb-4">{this.state.questions}</p>
            <>
              {this.state.options.map((item, index) => {
                return (
                  <ul key={index}>
                    <li
                      id="lists"
                      style={{ borderRadius: "13px" }}
                      className={
                        this.state.userAnswer === item ? "selected" : null
                      }
                      onClick={() => this.checkoption(item)}
                    >
                      {item.toUpperCase()}
                    </li>
                  </ul>
                );
              })}
            </>
            <button
              style={{ color: "white" }}
              id="nextButton"
              className={
                this.state.currentQuestion < qBank.length - 1
                  ? "btn btn-warning d-none"
                  : "btn btn-warning d-none"
              }
              onClick={this.nextHandler}
            >
              Next
            </button>
            {this.state.currentQuestion <= qBank.length - 1 && (
              <>
                {"    "}
                <button
                  id="submit"
                  style={{ color: "white" }}
                  className={
                    this.state.showButton
                      ? "btn btn-info d-none"
                      : "btn btn-info"
                  }
                  // type="submit"
                  onClick={this.submitHandler}
                >
                  Submit
                </button>{" "}
              </>
            )}
            {this.state.showFinishButton && (
              <>
                <button className="btn btn-success" onClick={this.endQuiz}>
                  Finish
                </button>{" "}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Quiz);
