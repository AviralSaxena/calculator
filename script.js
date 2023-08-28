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

document.addEventListener('keydown', (event) =>{
    const key = event.key;

    if (!isNaN(key)) handleNumber(key);
    if (['+', '-', '*', '/'].includes(key)) handleOperator(convertOperator(key));
    if (key === '.') handlePoint();
    if (['Backspace', 'Del'].includes(key)) handleDelete();
    if (['Enter', '='].includes(key)) handleEquals();
    if (['Escape', 'c', 'C'].includes(key)) handleClear();
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => handleNumber(button.textContent));
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => handleOperator(button.textContent));
});

clearButton.addEventListener('click', handleClear);

deleteButton.addEventListener('click', handleDelete);

pointButton.addEventListener('click', handlePoint);

equalsButton.addEventListener('click', handleEquals);

function convertOperator(key) {
    if (key === '/') return '÷'
    if (key === '*') return 'x'
    if (key === '-') return '-'
    if (key === '+') return '+'
}

function handleNumber(key){
    if (currentDisplay == 0) currentDisplay = '';
    currentDisplay += key;
    displayContainer.textContent = currentDisplay;
};

function handleOperator(key){
    if (currentDisplay === "") return;
    if (operator === "") {
        firstNum = currentDisplay;
        operator = key;
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
            currentHistory = result + " " + key;
            firstNum = result;
            secondNum = "";
            operator = key;
        }
    }
    displayHistoryContainer.textContent = currentHistory;
    currentDisplay = "";
}

function handleClear(){
    displayContainer.textContent = 0;
    displayHistoryContainer.textContent = "";
    currentDisplay = "";
    currentHistory = "";
    operator = "";
    firstNum = "";
    secondNum = "";
}

function handleDelete(){
    if (displayContainer.textContent.length === 1) {
        displayContainer.textContent = 0;
    } else {
        currentDisplay = displayContainer.textContent = displayContainer.textContent.slice(0, -1);
    }
}

function handlePoint(){
    if (displayContainer.textContent.includes('.')) return;
    else {
        currentDisplay += '.';
        displayContainer.textContent = currentDisplay;
    }
}

function handleEquals(){
    if (operator === "" || currentDisplay === "") return;
    secondNum = currentDisplay;
    let result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
    if (result == null) {
        displayContainer.textContent = "🤦";
        displayHistoryContainer.textContent ="";
        currentHistory = "";
        operator = "";
        currentDisplay = "";
        return;
    } else {
        displayContainer.textContent = result;
        currentHistory = currentHistory + ' ' + currentDisplay + ' = ';
        firstNum = result;
        secondNum = "";
        operator = "";
    }
    displayHistoryContainer.textContent = currentHistory;
    currentDisplay = result;
}

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