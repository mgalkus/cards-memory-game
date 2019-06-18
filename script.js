let numbers = [];
const board = document.querySelector('.game');
const start = document.querySelector('.start');
let waiting = false;
let prev;
let prevHTML;
let squares;

function startGame() {
    // 1. An array with numbers 1,1,2,2 till 6,6:
    for (let x = 1; x <= 6; x++) {
        numbers.push(x);
        numbers.push(x);
    }

    //2. Shuffles the array. (Function taken from https://javascript.info/task/shuffle)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    numbers = shuffle(numbers)

    //3. Creates 12 squares
    numbers.forEach(number => {
        board.insertAdjacentHTML('afterbegin', `<div data-n='${number}' class="square"></div>`)
    });

    squares = document.querySelectorAll('.square');

    // 4. Add event listeners on squares (when clicked, will display its number)
    squares.forEach(square => {
        square.addEventListener('click', () => {
            if (waiting) return;
            const n = square.dataset.n;
            square.textContent = n;

            if (!prev) {
                prev = n;
                prevHTML = square;
            } else {
                waiting = true;
                if (prev !== n) {
                    setTimeout(() => {
                        square.textContent = '';
                        prevHTML.textContent = '';
                        prev = null;
                        prevHTML = null;
                        waiting = false;
                    }, 700);
                } else {
                    if (square === prevHTML) return waiting = false
                    prev = null;
                    prevHTML = null;
                    waiting = false;
                }
            }
        })
    });
}

startGame()

// Resetting the game:
start.addEventListener('click', () => {
    squares.forEach(square => {
        board.removeChild(square);
        numbers = [];
    });
    startGame();
    prev = null;
    prevHTML = null;
})