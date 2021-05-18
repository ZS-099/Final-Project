import React, { Fragment, useState } from "react";
import REPTILE from '../images/quiz/reptile.PNG'
import SNAKE_ from '../images/quiz/snake.PNG'
import questions from '../Quiz.json';
import responses from '../Responses.json';
import CHAMELEON from '../images/quiz/responses/chameleon.PNG';
import CORN_SNAKE from '../images/quiz/responses/corn_snake.PNG';
import CRESTED_GECKO from '../images/quiz/responses/crested_gecko.PNG';
import DRAGON from '../images/quiz/responses/dragon.PNG';
import PYTHON from '../images/quiz/responses/python.PNG';
import SNAKE from '../images/quiz/responses/snake.PNG';
import TEGU from '../images/quiz/responses/tegu.PNG';
import TURTLE from '../images/quiz/responses/turtle.PNG';
import GECKO from '../images/quiz/responses/gecko.PNG'
import GECKO_BACKGROUND from '../images/quiz/gecko_background.png';
import FOREST from '../images/quiz/forest.png';

 
const ImageMap = {
  SNAKE,
  CHAMELEON,
  CORN_SNAKE,
  CRESTED_GECKO,
  DRAGON,
  PYTHON,
  TEGU,
  TURTLE,
  GECKO
}
const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])

const Quiz = () => {
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuizStarted, setIsQuizQtarted] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [winner,setWinner] = useState({})
  const [hasNoResult,setHasNoResult] = useState(false);
 
  const handleReset = () => {
    setAnswers([])
    setCurrentIndex(0)
    setIsQuizQtarted(true)
    setHasNoResult(false)
    setHasResult(false)
  }


  const getMatchedArrays = () => {
    let found  = false;
    let currentItemIndex = 0
    while(!found) {
      let currentItem = responses[currentItemIndex];
      if(!currentItem){
        setHasNoResult(true);
        return;
      }
      for(const combo of currentItem.combination) {
        if(equals(combo,answers)) {
          found = true;
          setWinner(currentItem);
          return;
        }
      }
      currentItemIndex++
    }
  }

  const renderQuizWinner = (result) => {
    return <div className="quiz__questions--body--result">
      <div>
        <h2 className="quiz__questions--body--result--head" >Congratulations</h2>
        <p className="quiz__questions--body--result--text"> {result.text}</p>
      </div>
      <div className="quiz__questions--body--result--imgc" >
        <img className="quiz__questions--body--result--imgc-image" src={ImageMap[result.img]} />
      </div>
    </div>
  }

  const handleBtnClick = (title) => {
    setCurrentIndex(currentIndex + 1)
    setAnswers([...answers, title])
  }

  
 
  const renderQuestions = (index, questions) => {
    const current = questions[index]
    if (currentIndex === questions.length) {
      getMatchedArrays();
      setHasResult(true);
      return
    }
    return <Fragment>
      <div className="quiz__title">
        <h4>{current.title}</h4>
      </div>
      <div className="quiz__options">
        <div className="quiz__options-btnGroup">
          {current.options.map((option, index) => {
            return <button key={index} onClick={() => handleBtnClick(option)} className="quiz__btn">{option}</button>
          })}
        </div>
      </div>
    </Fragment>
  }

 
  const renderQuizWelcomePage = () => {
    return (
      <div className="quiz__welcome">
        <div style={{ backgroundImage: `url(${GECKO_BACKGROUND})` }} className="quiz__welcome-intro">
          <div className="quiz__welcome-intro-head">
            <h4> Welcome </h4>
          </div>
          <div className="quiz__welcome-intro-body">
            <p>Complete this reptile quiz to find out which reptile is the best for your personality and lifestyle</p>
          </div>
          <div>
            <button onClick={()=> setIsQuizQtarted(true)} className="quiz__welcome-intro-btn" >START</button>
          </div>
        </div>
      </div>
    
    )
  }

  const renderNoResultPage = () => {
    return (
      <div className='quiz__welcome'>
         <div style={{backgroundImage:`url(${FOREST})`}} className="quiz__welcome-final">
           <div className="quiz__welcome-final--text">
             <h4>You're Impossible There doesn't seem to be any reptile that would make a good pet for you</h4>
           </div>
           <div className="quiz__welcome-final--cta">
              <button onClick={handleReset} className="quiz__welcome-final-btn">START AGAIN</button> 
           </div> 
         </div>
      </div>
    )
  }


  const renderQuizContainer = () => {
    return (
      <div className="quiz__container">
        <div className="quiz__container--content">
          <div style={{ backgroundImage: `url(${currentIndex < 4 ? REPTILE:SNAKE_})` }} className="quiz__photo" >
          </div>
          <div className="quiz__questions">
            <div className="quiz__questions--header">
              <p>Quiz</p>
            </div>
            <div className="quiz__questions--body">
              {!hasResult && renderQuestions(currentIndex, questions)}
              {hasResult && renderQuizWinner(winner)}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <section className="quiz">
    {  
     !isQuizStarted?renderQuizWelcomePage():hasNoResult?renderNoResultPage():renderQuizContainer()
    }
    
    
  </section>
}

export default Quiz;