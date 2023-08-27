let firstNum = "";
let secondNum = "";
let operator = "";
let currentDisplay = "";
let currentHistory = "";

const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operators');
const displayContainer = document.getElementById('display');
const displayHistoryContainer = document.getElementById('display-history');
const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('delete-button');
const pointButton = document.getElementById('point-button');
const equalsButton = document.getElementById('equals-button');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentDisplay == 0) currentDisplay = '';
        currentDisplay += button.textContent;
        displayContainer.textContent = currentDisplay;
    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentDisplay === "") return;
        if (operator === "") {
            firstNum = currentDisplay;
            operator = button.textContent;
            currentHistory = currentDisplay + " " + operator;
        }
        else {
            secondNum = currentDisplay;
            let result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
            if (result == null) {
                displayContainer.textContent = "🤦";
                currentHistory = "";
                        operator = "";
                        currentDisplay = "";
            }
            else {
                displayContainer.textContent = result;
                currentHistory = result + " " + button.textContent;
                firstNum = result;
                secondNum = "";
                operator = button.textContent;
            }
        }
        displayHistoryContainer.textContent = currentHistory;
        currentDisplay = "";
    });
});

clearButton.addEventListener('click', () => {
    displayContainer.textContent = 0;
    displayHistoryContainer.textContent = "";
    currentDisplay = "";
    currentHistory = "";
    operator = "";
    firstNum = "";
    secondNum = "";
});


deleteButton.addEventListener('click', () => {
    currentDisplay = currentDisplay.slice(0, -1);
    if (currentDisplay.length == 0) {
        displayContainer.textContent = 0;
    } else {
        displayContainer.textContent = currentDisplay;
    }
});

pointButton.addEventListener('click', () => {
    if (displayContainer.textContent.includes('.')) return;
    else {
        currentDisplay += '.';
        displayContainer.textContent = currentDisplay;
    }
});

equalsButton.addEventListener('click', () => {
    if (operator === "" || currentDisplay === "") return;
    secondNum = currentDisplay;
    let result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
    if (result == null) {
        displayContainer.textContent = "🤦";
        currentHistory = "";
        operator = "";
        currentDisplay = "";
    } else {
        displayContainer.textContent = result;
        currentHistory = currentHistory + ' ' + currentDisplay + ' = ';
        firstNum = result;
        secondNum = "";
        operator = "";
    }

    displayHistoryContainer.textContent = currentHistory;
    currentDisplay = result;
});

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case '+':
            return round(firstNum + secondNum);
        case '-':
            return round(firstNum - secondNum);
        case 'x':
            return round(firstNum * secondNum);
        case '÷':
            if (secondNum == 0) return null;
            return round(firstNum / secondNum);
    }
}

function round(operation) {
    return Math.round(operation * 1000) / 1000;
}