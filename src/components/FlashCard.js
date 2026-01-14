import React, { useState } from "react";
import "./FlashCard.css";

export default function FlashCard({ question, answer }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`flashcard ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
        >
            <div className="front">{question}</div>
            <div className="back">{answer}</div>
        </div>
    );
}
