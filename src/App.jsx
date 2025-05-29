import { languages } from "./languages"
import { useState } from "react"
import { clsx } from "clsx"
import { getFarewellText, getRandomWord } from "./utils"
import Confetti from "react-confetti"


export default function App() {

  //State
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guess, setGuess] = useState([])

  //Derived
  const wrongGuessCount = guess.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guess.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuess = guess[guess.length - 1]
  const isLastGuessIncorrect = lastGuess && !currentWord.includes(lastGuess)

  //Static
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function startNewGame() {
    setCurrentWord(getRandomWord)
    setGuess([])
  }

  function addGuessedLetter(letter) {
    setGuess(prevGuess =>
      prevGuess.includes(letter) ?
        prevGuess : [...prevGuess, letter])
  }

  const languageElements = languages.map((lang, index) => {

    const isLanguageLost = index < wrongGuessCount

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }

    const className = clsx("chip", isLanguageLost && "lost")

    return (
      <span
        className={className}
        key={lang.name}
        style={styles}
      >
        {lang.name}
      </span>
    )

  })

  const letterELements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guess.includes(letter)
    const letterClassName = clsx(
      isGameLost && !guess.includes(letter) && "missed-letter"
    )
    return (
      <span className={letterClassName} key={index}>{ shouldRevealLetter ? letter.toUpperCase() : ""}</span>
    )
  })

  const keyboardElements = alphabet.split("").map((key) => {

    const isGuessed = guess.includes(key)
    const isCorrect = isGuessed && currentWord.includes(key)
    const isWrong = isGuessed && !currentWord.includes(key)

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })


    return (
      <button
        className={className}
        key={key}
        disabled={isGameOver}
        aria-disabled={guess.includes(key)}
        aria-label={`Letter ${key}`}
        onClick={() => addGuessedLetter(key)}
      >
        {key.toUpperCase()}
      </button>
    )
  })

  const gameStatusClass = clsx("status-section", { won: isGameWon, lost: isGameLost, farewell: !isGameOver && isLastGuessIncorrect })

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return <p className="farewell-message">{getFarewellText(languages[wrongGuessCount-1].name)}</p>
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }
    return null
  }

  return (
    
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <header>
        <h1>Assembly : Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {renderGameStatus()}
      </section>
      <section className="language-chips">
        {languageElements}
      </section>
      <section className="word">
        {letterELements}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
      {isGameOver && <button onClick={startNewGame} className="new-game">New Game</button>}
    </main>
  )
}