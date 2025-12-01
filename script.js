const gameBoard = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');

const emojis = [
    "if you were any shorter, you'd be a pixel",
    "get those damn prescriptions",
    "all your English vocabulary is from League",
    "describe what grass feels like",
    "'what? what? what?' - you without hearing aids",
    "🐒",
    "there are at least 4 reasons why i wouldn't want you to drive me",
    "'omg it's ___ from League' - you"
];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let isLocked = false;

function initGame() {
    // Reset state
    cards = [...emojis, ...emojis]; // Pairs
    flippedCards = [];
    matchedPairs = 0;
    isLocked = false;

    shuffleCards(cards);
    renderBoard();
}

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderBoard() {
    gameBoard.innerHTML = '';
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.emoji = emoji;

        const front = document.createElement('div');
        front.classList.add('card-face', 'card-front');

        const back = document.createElement('div');
        back.classList.add('card-face', 'card-back');
        back.textContent = emoji;

        card.appendChild(front);
        card.appendChild(back);

        // Add shuffle animation with staggered delay
        card.classList.add('shuffling');
        card.style.animationDelay = `${index * 0.05}s`;

        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (isLocked) return;
    if (card.classList.contains('flipped')) return;
    if (flippedCards.length === 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.emoji === card2.dataset.emoji;

    if (match) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === emojis.length) {
            setTimeout(() => alert('You Win! Ooh ooh ah ah!'), 500);
        }
    } else {
        isLocked = true;

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isLocked = false;
        }, 1000);
    }
}

resetBtn.addEventListener('click', initGame);

// Start game on load
initGame();
