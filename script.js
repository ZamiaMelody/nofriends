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

        if (emoji === "🐒") {
            back.classList.add('monkey-card');
        }

        card.appendChild(front);
        card.appendChild(back);

        // Add shuffle animation with staggered delay
        card.classList.add('shuffling');
        card.style.animationDelay = `${index * 0.05}s`;

        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });

    // Remove shuffling class after all animations are done
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(c => c.classList.remove('shuffling'));
    }, 1500);
}

function flipCard(card) {
    // Ensure shuffling class is gone
    card.classList.remove('shuffling');

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
        // Match found
        flippedCards = [];

        matchedPairs++;
        // Check win condition
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
createFloatingBananas();

function createFloatingBananas() {
    const container = document.getElementById('banana-container');
    const bananaCount = 20;

    for (let i = 0; i < bananaCount; i++) {
        const banana = document.createElement('div');
        banana.textContent = '🍌';
        banana.classList.add('floating-banana');

        // Random properties
        const size = Math.random() * 40 + 20; // 20px - 60px
        const top = Math.random() * 100; // 0% - 100%
        const duration = Math.random() * 10 + 10; // 10s - 20s
        const delay = Math.random() * 20; // 0s - 20s
        const initialRotation = Math.random() * 360;

        banana.style.fontSize = `${size}px`;
        banana.style.left = '100%'; // Start off-screen right
        banana.style.top = `${top}%`;
        banana.style.animationDuration = `${duration}s`;
        banana.style.animationDelay = `-${delay}s`; // Negative delay to start mid-animation
        banana.style.transform = `rotate(${initialRotation}deg)`;

        container.appendChild(banana);
    }
}
