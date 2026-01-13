import React from "react";
import CardForm from "./CardForm";
import FlashCard from "./FlashCard";

export default function Deck({ deck, goBack, addCard }) {
    return (
        <div>
            <button className="back-button" onClick={goBack}>Back</button>
            <button className="view-decks-button" onClick={goBack}>
                View All Decks
            </button>

            <h2>{deck.name}</h2>
            <h3>Cards</h3>
             <div className="cards-container">
                 {Object.entries(deck.cards).map(([id, card]) => (
                     <FlashCard
                         key={id}
                         question={card.question}
                         answer={card.answer}
                     />
                ))}
             </div>

            <div className="form-wrapper">
                <CardForm addCard={addCard} />
            </div>

        </div>
    );
}
