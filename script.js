// Sudoku Game Variables
const sudokuScreen = document.getElementById('sudokuScreen');
const sudokuBoard = document.getElementById('sudokuBoard');
let sudokuSolved = false;

// Sudoku puzzle (0 = empty)
const sudokuPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const sudokuSolution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

// Initialize Sudoku Board
function initSudoku() {
    sudokuBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = '1';
            cell.className = 'sudoku-cell';
            cell.id = `cell-${i}-${j}`;
            
            if (sudokuPuzzle[i][j] !== 0) {
                cell.value = sudokuPuzzle[i][j];
                cell.classList.add('filled');
                cell.disabled = true;
            } else {
                cell.classList.add('input');
                cell.placeholder = '?';
            }
            
            // Only allow numbers 1-9
            cell.addEventListener('input', function(e) {
                if (e.target.value && !/^[1-9]$/.test(e.target.value)) {
                    e.target.value = '';
                }
            });
            
            sudokuBoard.appendChild(cell);
        }
    }
}

// Check Sudoku Solution
function checkSudoku() {
    let correct = true;
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            const value = parseInt(cell.value) || 0;
            
            if (value !== sudokuSolution[i][j]) {
                correct = false;
                break;
            }
        }
        if (!correct) break;
    }
    
    if (correct) {
        sudokuSolved = true;
        alert('🎉 Correct! Moving to the next challenge...');
        startHeartsGame();
    } else {
        alert('❌ Not quite right! Try again! 💪');
    }
}

// Skip Sudoku (cheat button)
function skipSudoku() {
    startHeartsGame();
}

// Secret keyboard shortcut to show skip button (Ctrl+Shift+S)
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'S') {
        const skipBtn = document.getElementById('skipBtn');
        skipBtn.classList.toggle('visible');
    }
});

// Start Hearts Game
function startHeartsGame() {
    sudokuScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameActive = true;
    collectedHearts = 0;
    heartsCollected.textContent = '0';
    
    // Start creating hearts
    heartInterval = setInterval(() => {
        if (gameActive) {
            createHeart();
        }
    }, 1000);
}

// Initialize Sudoku on page load
initSudoku();

// Game Variables
const gameScreen = document.getElementById('gameScreen');
const gameArea = document.getElementById('gameArea');
const heartsCollected = document.getElementById('heartsCollected');
const heartsNeeded = document.getElementById('heartsNeeded');
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const overlay = document.getElementById('overlay');

let collectedHearts = 0;
const requiredHearts = 10;
let gameActive = true;
let heartInterval = null;

// Create falling hearts
function createHeart() {
    if (!gameActive) return;
    
    const heart = document.createElement('div');
    heart.className = 'game-heart';
    heart.textContent = '❤️';
    
    const randomLeft = Math.random() * (gameArea.clientWidth - 50);
    heart.style.left = randomLeft + 'px';
    
    gameArea.appendChild(heart);
    
    heart.addEventListener('click', function(e) {
        e.stopPropagation();
        collectedHearts++;
        heartsCollected.textContent = collectedHearts;
        heart.remove();
        
        if (collectedHearts >= requiredHearts) {
            winGame();
        }
    });
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 4000);
}

// Win game function
function winGame() {
    gameActive = false;
    clearInterval(heartInterval);
    
    // Hide game screen and show envelope
    setTimeout(() => {
        gameScreen.classList.add('hidden');
        envelope.classList.remove('hidden');
    }, 500);
}

// Open envelope and letter when clicked
envelope.addEventListener('click', function() {
    if (!envelope.classList.contains('hidden')) {
        // Add open class to animate flap
        envelope.classList.add('open');
        
        // Play music
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.play().catch(() => {
            // If autoplay is blocked, user can manually click to play
        });
        
        // Show letter and overlay with delay
        setTimeout(() => {
            letter.classList.remove('hidden');
            overlay.classList.add('active');
        }, 300);
    }
});

// Close letter function
function closeLetter() {
    letter.classList.add('hidden');
    overlay.classList.remove('active');
    
    // Reset envelope after animation
    setTimeout(() => {
        envelope.classList.remove('open');
    }, 600);
}

// Close when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && overlay.classList.contains('active')) {
        closeLetter();
    }
});
