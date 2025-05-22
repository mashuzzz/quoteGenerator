const generateButton = document.getElementById('generateButton');
const quoteOutput = document.getElementById('quoteOutput');
const copyButton = document.getElementById('copyButton');
const favoriteButton = document.getElementById('favoriteButton');
const favoritesList = document.getElementById('favoritesList');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');

const quotes = [
    { text: "Живи настоящим моментом.", author: "Неизвестный" },
    { text: "Маленькие шаги приводят к большим целям.", author: "Аноним" },
    { text: "Счастье — это путь, а не цель.", author: "Неизвестный" },
    { text: "Твори добро, и оно вернется.", author: "Народная мудрость" },
    { text: "Сегодня лучший день.", author: "Неизвестный" },
    { text: "Будьте тем человеком, с которым вы хотите провести всю жизнь.", author: "Аноним" },
    { text: "Будьте счастливы. Это сводит людей с ума.", author: "Неизвестный" },
    { text: "Если бы я хорошо себя вела, я бы умерла от скуки.", author: "Народная мудрость" },
    { text: "Будь собой. Мир поклоняется оригиналу.", author: "Ингрид Бергман" },
    { text: "В мире 7 миллиардов улыбок, а твоя — моя любимая.", author: "Аноним" },
    { text: "Не останавливайся, забудь что это такое.", author: "Неизвестный" },
    { text: "Спи, как будто никто не смотрит.", author: "Народная мудрость" },
    { text: "Все возможно, когда у нас есть правильные люди рядом", author: "Неизвестный" },
    { text: "Любовь не признает барьеров.", author: "Майя Анжелу" },
    { text: "Ты принадлежишь к полевым цветам.", author: "Неизвестный" },
    { text: "Возраст — это просто ярлык.", author: "Народная мудрость" }
];

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let history = [];

function displayRandomQuote() {
    quoteOutput.classList.remove('show');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex].text;
    const selectedAuthor = quotes[randomIndex].author;
    quoteOutput.textContent = `"${selectedQuote}" — ${selectedAuthor}`;
    setTimeout(() => {
        quoteOutput.classList.add('show');
        copyButton.classList.add('show');
        favoriteButton.classList.add('show');
    }, 10);
    
    history.unshift(quoteOutput.textContent);
    if (history.length > 5) history.pop();
    displayHistory();
}

function copyQuote() {
    const textToCopy = quoteOutput.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        copyButton.textContent = 'Скопировано!';
        setTimeout(() => {
            copyButton.textContent = 'Скопировать цитату';
        }, 2000);
    }).catch(() => {
        copyButton.textContent = 'Ошибка копирования';
        setTimeout(() => {
            copyButton.textContent = 'Скопировать цитату';
        }, 2000);
    });
}

function addToFavorites() {
    const currentQuote = quoteOutput.textContent;
    if (currentQuote && !favorites.includes(currentQuote)) {
        favorites.push(currentQuote);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }
}

function removeFromFavorites(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

function displayFavorites() {
    favoritesList.innerHTML = '';
    favorites.forEach((quote, index) => {
        const div = document.createElement('div');
        div.className = 'favorite-item';
        div.innerHTML = `
            <span>${quote}</span>
            <button class="removeFavoriteButton" data-index="${index}">Удалить</button>
        `;
        favoritesList.appendChild(div);
    });
    document.querySelectorAll('.removeFavoriteButton').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            removeFromFavorites(index);
        });
    });
}

function displayHistory() {
    historyList.innerHTML = '';
    history.forEach(quote => {
        const p = document.createElement('p');
        p.textContent = quote;
        historyList.appendChild(p);
    });
}

function clearHistory() {
    history = [];
    displayHistory();
}

generateButton.addEventListener('click', displayRandomQuote);
copyButton.addEventListener('click', copyQuote);
favoriteButton.addEventListener('click', addToFavorites);
clearHistoryButton.addEventListener('click', clearHistory);

displayFavorites();