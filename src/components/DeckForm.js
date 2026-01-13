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
        <form onSubmit={handleSubmit}>
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Deck Name"
            />
            <button type="submit">Add deck</button>
        </form>
    );
}