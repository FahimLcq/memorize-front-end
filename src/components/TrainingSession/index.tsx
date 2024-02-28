import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAllTrainingCards, newCardArray, setCurrentDifficulty } from "../../store/actions/trainingSession/getTrainingCards";
import { SetStateAction, useEffect, useState } from "react";
import { editTrainingCards } from "../../store/actions/trainingSession/newTrainingCards";
import { updateTrainingCards } from "../../store/actions/trainingSession/updateTrainingCards";
import "./style.scss"


function TrainingSession() {
  const { deckId } = useParams()
  const [flip, setFlip] = useState(false);
  const [countFlip, setCountFlip] = useState(0);
  const [isDifficultySelected, setIsDifficultySelected] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const dispatch = useAppDispatch()
  
  const handleCardClick = () => {
    setFlip(!flip)
    setCountFlip(countFlip + 1)
  };


  const cards = useAppSelector((state) => state.trainingCards.cards);

  let card = cards[cardIndex];

  console.log(cardIndex);
  console.log(cards.length);

  const cardsLeftToMemorize = cards.filter((card) => card.isCardMemorized === false).length;
  console.log(cardsLeftToMemorize);

  const findHardCardIndex = cards.findIndex((card) => card.isCardMemorized === false);
  console.log(findHardCardIndex);

  const handleCurrentDifficultyClick = (event) => {
    const id = card.id;
    const currentDifficulty = Number(event.target.value);
    dispatch(setCurrentDifficulty({id, currentDifficulty}));
    setIsDifficultySelected(true);
  }

  const handleNextCard = (event) => {
    const id = card.id;
    console.log(id);
    if (cardIndex < cards.length -1) {
      setCardIndex(cardIndex + 1)
    }
    
    setCountFlip(0);
    setFlip(false);
    setIsDifficultySelected(false);
  }

  const handleSessionEnd = () => {
    const updatedDifficulties = cards.reduce((array, card) => {
      const currentPick = {};
      currentPick[card.id] = card.difficulty
      array.push(currentPick)
      return array;
    }, [])

    dispatch(updateTrainingCards(deckId, updatedDifficulties)) 
  }

  console.log(card);
  console.log(cards);

  useEffect(()=> {
    dispatch(getAllTrainingCards(deckId)) 
  }, [])


 
  return (
    <>
      <h1 className="flex justify-center items-center title py-2">
        Training session
      </h1>

        <div className="card-container flex justify-center items-center title">
        {cardIndex < cards.length && (
          <div key={cards[cardIndex].id}
            className={`flip-trainingcard ${flip ? "flip" : ""}`}
            onClick={handleCardClick}
          >
            <div className="flip-trainingcard-inner">
              <div className="flip-trainingcard-front">
                <p className="title">{cards[cardIndex].front}</p>
              </div>
              <div className="flip-trainingcard-back">
                <p className="title">{cards[cardIndex].back}</p>
              </div>
            </div>
          </div>
       )}
      </div>

      <div className="difficulty-buttons-container flex justify-center items-center mt-3">
      { countFlip > 0 && 
        <div className="flex justify-center items-center">

            <button 
              value={1}
              className="block bg-B4ABCE p-4 w-24 rounded text-white m-2"
              onClick={handleCurrentDifficultyClick}
            >
              Easy
            </button>

            <button
              value={2} 
              className="bg-amber-300 p-4 w-24 rounded text-white m-2"
              onClick={handleCurrentDifficultyClick}
            >
                Medium
            </button>

            <button 
              value={3}
              className="bg-orange-200 p-4 w-24 rounded text-white m-2"
              onClick={handleCurrentDifficultyClick}
            >
              Hard
            </button>
          </div>
      }
      </div>


        <div className="next-container flex justify-center items-center" >
          <div className="flex justify-center items-center mr-7">
            {/* { cardsLeftToMemorize === 0 &&
            <button className="block bg-cyan-500 w-24 p-4 ml-10 rounded text-white m-2" 
            onClick={handleSessionEnd}>
           Finish
            </button>
            } */}
            { cardsLeftToMemorize > 0 && isDifficultySelected ?
            <button className="block bg-1F3D75 w-24 p-4 ml-10 rounded text-white m-2" 
            onClick={handleNextCard}>
           Next
            </button>
            : ""
            }
          </div>
        </div>

        { cardsLeftToMemorize === 0 ? (
        <div className="flex justify-end items-end">
            <Link to="/" className="flex justify-end items-end">
              <button className="block bg-black p-4 rounded text-white m-2 font-semibold" onClick={handleSessionEnd}>End session</button>
            </Link>
        </div>) : ""}   
        
    </>
  )
}

export default TrainingSession;