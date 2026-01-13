import React, { useState } from "react";

export default function CardForm({ addCard }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!question.trim() || !answer.trim()) return;

        addCard(question, answer);
        setQuestion("");
        setAnswer("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <input
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />

            <button type="submit">Add Card</button>
        </form>
    );
}
