const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operators');
const displayContainer = document.getElementById('display');
let currentInput = "";

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        currentInput += button.textContent;
        displayContainer.textContent = currentInput;
    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click',()=>{
        currentInput += button.textContent;
        displayContainer.textContent = currentInput;
    });
})

function updateDisplay() {
    if (currentInput.length === 0) {
        displayContainer.textContent = "";
    } else if (currentInput[currentInput.length - 1] === ' ') {
        displayContainer.textContent = currentInput.trim();
    } else {
        displayContainer.textContent = currentInput;
    }
}