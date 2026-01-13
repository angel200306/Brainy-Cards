import React, { useState, useEffect } from "react";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import DeckForm from "./components/DeckForm";
import { loadData, saveData } from "./storage";

export default function App() {
    const [decks, setDecks] = useState({});
    const [currentDeck, setCurrentDeck] = useState(null);

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

    const selectDeck = (id) => setCurrentDeck(id);

    const addCard = (deckId, question, answer) => {
        const newCard = { question, answer };
        setDecks({
            ...decks,
            [deckId]: {
                ...decks[deckId],
                cards: {
                    ...decks[deckId].cards,
                    [Date.now().toString()]: newCard
                }
            }
        });
    };

    return (
        <div className="name">
            <h1>Welcome to Brainy Cards</h1>
            <p>Please create a new desc with cards.</p>
            {!currentDeck ? (
                <>
                    <h2>Decks</h2>
                    <DeckForm addDeck={addDeck} />
                    <DeckList decks={decks} selectDeck={selectDeck} />
                </>
            ) : (
                <Deck
                    deck={decks[currentDeck]}
                    goBack={() => setCurrentDeck(null)}
                    addCard={(q, a) => addCard(currentDeck, q, a)}
                />
            )}
        </div>
    );
}
