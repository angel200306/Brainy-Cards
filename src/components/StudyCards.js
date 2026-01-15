import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";

export default function StudyCards({ deck, deckId, setDecks, goBack }) {
    const [cardsToStudy, setCardsToStudy] = useState([]);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const todayCards = Object.entries(deck.cards || {})
            .filter(([_, card]) => card.nextReview <= Date.now())
            .map(([id, card]) => ({ ...card, cardId: id }));

        setCardsToStudy(todayCards);
    }, [deck]);

    // Таймер для майбутніх повторень
    useEffect(() => {
        if (cardsToStudy.length > 0) return;

        const futureDates = Object.values(deck.cards || {})
            .map((c) => c.nextReview)
            .filter((date) => date > Date.now());

        if (futureDates.length === 0) {
            setTimeLeft("—");
            return;
        }

        const targetTime = Math.min(...futureDates);

        const tick = () => {
            const msLeft = targetTime - Date.now();
            if (msLeft <= 0) {
                setTimeLeft("0d 0h 0m 0s");
            } else {
                const days = Math.floor(msLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((msLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((msLeft % (1000 * 60)) / 1000);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        };

        tick();
        const intervalId = setInterval(tick, 1000);
        return () => clearInterval(intervalId);
    }, [deck, cardsToStudy]);

    if (!cardsToStudy || cardsToStudy.length === 0) {
        return (
            <div>
                <button onClick={goBack} style={{ marginBottom: "20px" }}>
                    ⬅ Back
                </button>
                <h2>🎉 All cards studied today!</h2>
                <p>Next review in: {timeLeft}</p>
            </div>
        );
    }

    const card = cardsToStudy[0];

    const handleAnswer = (known) => {
        const newInterval = known ? Math.min(card.interval * 2, 30) : 1;
        const updatedDeck = { ...deck };

        updatedDeck.cards[card.cardId] = {
            ...card,
            interval: newInterval,
            repetition: known ? card.repetition + 1 : 0,
            nextReview: Date.now() + newInterval * 86400000,
        };

        setDecks((prev) => ({
            ...prev,
            [deckId]: updatedDeck,
        }));

        setCardsToStudy((prev) =>
            prev.filter((c) => c.cardId !== card.cardId)
        );
    };

    return (
        <div>
            <button
                onClick={goBack}
                style={{ alignSelf: "flex-start", marginLeft: "20px" }}
            >
                ⬅ Back
            </button>

            <FlashCard question={card.question} answer={card.answer} />

            <div style={{ display: "flex", gap: "15px" }}>
                <button onClick={() => handleAnswer(false)}>❌ Don't know</button>
                <button onClick={() => handleAnswer(true)}>✅ Know</button>
            </div>
        </div>
    );
}
