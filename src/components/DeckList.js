import React from "react"

export default function DeckList({ decks, selectDeck }) {
    return (
        <ul>
            {Object.entries(decks).map(([id, deck]) => (
                <li key={id}>
                    {deck.name}
                    <button onClick={() => selectDeck(id)}>Open</button>
                </li>
            ))}
        </ul>
    );
}