import React, { useState } from 'react'
import "./style.css"

export default function IndexPage() {
  const [answer, setAnswer] = useState(JSON.parse(localStorage.getItem("answer")) || [])
  const [index, setIndex] = useState(parseInt(localStorage.getItem("index")) || 1)
  const letters = ["a", "b", "c", "d"]

  const handleAnswer = (letter) => {
    const res = { index: index, name: letter }
    if (answer.find(obj => obj.index === index) !== undefined) {
      const newIndex = answer.findIndex(obj => obj.index === index)
      let answerArray = [...answer]
      answerArray[newIndex] = res
      setAnswer(answerArray)
    } else {
      setAnswer([...answer, res])
    }
    setIndex(index + 1)
    save()
  }

  const handleSuivant = () => {
    setIndex(index + 1)
    save()
  }

  const handlePrecedent = () => {
    setIndex(index - 1)
    save()
  }

  const handleReset = () => {
    setIndex(1)
    setAnswer([])
    save()
  }

  const handleInput = (e) => {
    setIndex(parseInt(e.target.value))
  }

  const save = () => {
    localStorage.setItem("answer", JSON.stringify(answer))
    localStorage.setItem("index", index)
  }

  return (
    <div>
      <div className="header">
        <h1>Question</h1>
        <input type="text" value={index} onChange={handleInput} />
      </div>
      {letters.map(letter => (
        <div className="button" onClick={() => handleAnswer(letter)} key={letter}>{letter}</div>
      ))}
      <div className="button" onClick={handleSuivant}>
        Suivant
      </div>
      <div className="button" onClick={handlePrecedent}>
        Précédent
      </div>
      <div className="ans-container">
        <div>
          {answer.map(ans => (
            <p key={ans.index}>{ans.index} - {ans.name}</p>
          ))}
        </div>
      </div>
      <div className="reset button" onClick={handleReset}>RESET</div>
    </div>
  )
}
