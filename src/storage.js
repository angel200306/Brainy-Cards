export const loadData = () => {
    const data = localStorage.getItem("decks");
    return data ? JSON.parse(data) : [];
}

export const saveData = (decks) => {
    localStorage.setItem("decks", JSON.stringify(decks));
};