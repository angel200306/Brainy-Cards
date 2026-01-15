import React from "react";
import FlashCard from "./FlashCard";

export default function Deck({ deck, deckId, goBack, addCard, startStudy, showStudyButton }) {
    return (
        <div>
            <button onClick={goBack}>⬅ Back</button>
            <h2>{deck.name}</h2>

                <button className="button-study" onClick={startStudy}>
                    📚 Study Cards
                </button>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const question = e.target.question.value;
                    const answer = e.target.answer.value;
                    addCard(question, answer);
                    e.target.reset();
                }}
            >
                <input name="question" placeholder="Question" required />
                <input name="answer" placeholder="Answer" required />
                <button type="submit">Add Card</button>
            </form>

            <div>
                <h3>Cards in this deck: {Object.keys(deck.cards).length}</h3>
            </div>
        </div>
    );
}
