import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

class Score extends Component {
  state = {
    score: 0,
    numberOfCorrect: 0,
    numberOfWrongs: 0,
    numberOfQuestion: 0
  };

  componentDidMount() {
    this.getScore();
    console.log(this.state.score);
    console.log(this.props);
  }

  getScore = () => {
    const { score, numberOfQuestion } = this.props.location.state;
    console.log(score, numberOfQuestion);
    this.setState({
      score: (score / (numberOfQuestion + 1)) * 100,
      numberOfCorrect: this.props.location.state.numberOfAnswered,
      numberOfWrongs: this.props.location.state.wrongAnswers,
      numberOfQuestion: this.props.location.state.numberOfQuestion + 1
    });
  };
  render() {
    return (
      <>
        <div className="tm-content-container shadow-lg">
          <figure className="mb-0">
            <img src="img/img-2.jpg" alt="Image" className="img-fluid tm-img" />
          </figure>

          <div className="tm-content">
            <br /> <br />
            <h2> Total Score </h2>
            <p>Number of Correct Answers: {this.state.numberOfCorrect} </p>
            <p>Number of Question: {this.state.numberOfQuestion} </p>
            <p>Number of Wrong Answers: {this.state.numberOfWrongs} </p>
            <p>{`Number of Total Score: ${this.state.score} %`}</p>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Score);
