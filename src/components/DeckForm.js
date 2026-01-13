import React, { useState } from "react"

export default function DeckForm({ addDeck }) {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        addDeck(name);
        setName("");
    };

    return (
        <div>
        <button className="view-decks-button" onClick={goBack}>
            View All Decks
        </button>
        <form onSubmit={handleSubmit}>
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Deck Name"
            />
            <button type="submit">Add deck</button>
        </form>
        </div>
    );
}