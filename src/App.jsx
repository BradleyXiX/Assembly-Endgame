import { languages } from "./languages"
import { useState } from "react"

export default function App() {

  const [currentWord, setCurrentWord] = useState("react")

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
 
  const languageElements = languages.map( lang => {

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }

    return (
      <span className="chip" key={lang.name} style={styles}>{lang.name}</span>
    )

  })

  const letterELements = currentWord.split("").map((letter, index) => (
    <span key={index}>{letter.toUpperCase()}</span>
  ))

  const keyboardElements = alphabet.split("").map((key, index) => (
    <button className="key" key={index}>{key.toUpperCase()}</button>
  ))

  return (
    <main>
      <header>
        <h1>Assembly : Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="status-section">
        <h2>You win!</h2>
        <p>Well done🎉</p>
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
      <button className="new-game">New Game</button>
    </main>
  )
}