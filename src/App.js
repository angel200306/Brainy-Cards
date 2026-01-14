import React, { useState, useEffect } from "react";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import DeckForm from "./components/DeckForm";
import StudyCards from "./components/StudyCards";
import { loadData, saveData } from "./storage";

export default function App() {
    const [decks, setDecks] = useState({});
    const [currentDeck, setCurrentDeck] = useState(null);
    const [studyCards, setStudyCards] = useState(false);
    const startStudy = () => {
        setStudyCards(true);
    };


    useEffect(() => {
        setDecks(loadData());
    }, []);

    useEffect(() => {
        saveData(decks);
    }, [decks]);

    const addDeck = (name) => {
        const id = Date.now().toString();
        setDecks({ ...decks, [id]: { name, cards: {} } });
    };

    const addCard = (deckId, question, answer) => {
        const newCard = {
            question,
            answer,
            interval: 1,
            repetition: 0,
            nextReview: Date.now(),
        };
        setDecks({
            ...decks,
            [deckId]: {
                ...decks[deckId],
                cards: {
                    ...decks[deckId].cards,
                    [Date.now().toString()]: newCard,
                },
            },
        });
    };

    // Перевірка, чи є картки для повторення
    const hasCardsToStudy = (deckId) => {
        const deck = decks[deckId];
        if (!deck) return false;
        return Object.values(deck.cards).some(
            (card) => card.nextReview <= Date.now()
        );
    };

    return (
        <div className="app-container">
            <h1>Brainy Cards</h1>
            <p>Disclaimer!!!! This project isn't commercial. This project is my pet project. I developed this project from my personal guess.</p>
            <h2>Create a new deck with cards to start learning!</h2>
            {studyCards && currentDeck ? (
                <StudyCards
                    deck={decks[currentDeck]}
                    deckId={currentDeck}
                    setDecks={setDecks}
                    goBack={() => setStudyCards(false)}
                />
            ) : !currentDeck ? (
                <>
                    <DeckForm addDeck={addDeck} />
                    <DeckList decks={decks} selectDeck={setCurrentDeck} />
                </>
            ) : (
                <Deck
                    deck={decks[currentDeck]}
                    deckId={currentDeck}
                    goBack={() => setCurrentDeck(null)}
                    addCard={(q, a) => addCard(currentDeck, q, a)}
                    startStudy={() => setStudyCards(true)}
                    showStudyButton={hasCardsToStudy(currentDeck)}
                />
            )}
        </div>
    );
}
