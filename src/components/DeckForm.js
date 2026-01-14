import React, { useState } from "react"

export default function DeckForm({ addDeck, startStudy }) {
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
            {startStudy && (
                <button className="button-study" onClick={startStudy}>
                    📚 Study Cards
                </button>
            )}
            <button type="submit">Add deck</button>
        </form>
    );
}