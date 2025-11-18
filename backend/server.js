const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Load questions from JSON file once at startup
const QUESTIONS_FILE = path.join(__dirname, "question.json");
let questions = [];

try {
    questions = JSON.parse(fs.readFileSync(QUESTIONS_FILE, "utf-8"));
} catch (error) {
    console.error("Failed to load questions:", error);
    process.exit(1);
}

// Route: Get one random question
app.get("/question", (req, res) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];

    // Don't send the answer to frontend
    const { answer, ...safeQuestion } = question;

    res.json(safeQuestion);
});

// Route: Submit answer
app.post("/answer", (req, res) => {
    const { id, selectedOption } = req.body;

    const question = questions.find(q => q.id === id);
    if (!question) {
        return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect = question.answer === selectedOption;

    res.json({
        correct: isCorrect,
        correctAnswer: question.answer
    });
});

app.listen(5000, () => {
    console.log("Quiz server running on http://localhost:5000");
});

