import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch a random question
  const loadQuestion = async () => {
    setLoading(true);
    setResult(null);
    setSelected("");

    const res = await axios.get("http://localhost:5000/question");
    setQuestion(res.data);

    setLoading(false);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  // Submit answer
  const checkAnswer = async () => {
    const res = await axios.post("http://localhost:5000/answer", {
      id: question.id,
      selectedOption: selected,
    });

    setResult(res.data.correct ? "Correct!" : `Wrong! Correct answer: ${res.data.correctAnswer}`);
  };

  return (
    <div className="container">

      <h1>Simple Quiz Game</h1>

      {loading && <p>Loading question...</p>}

      {question && !loading && (
        <div className="quiz-box">
          <h2>{question.question}</h2>

          <div className="options">
            {question.options.map((op, index) => (
              <label key={index} className="option-item">
                <input
                  type="radio"
                  name="option"
                  value={op}
                  checked={selected === op}
                  onChange={() => setSelected(op)}
                />
                {op}
              </label>
            ))}
          </div>

          <button disabled={!selected} onClick={checkAnswer}>
            Submit
          </button>

          {result && (
            <>
              <p className={result.includes("Correct") ? "correct" : "wrong"}>{result}</p>
              <button onClick={loadQuestion}>Next Question</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
