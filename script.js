let firstNum = "";
let secondNum = "";
let operator = null;

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
    else if (['+', '-', '*', '/'].includes(key)) handleOperator(convertOperator(key));
    else if (key === '.') handlePoint();
    else if (['BACKSPACE', 'DELETE'].includes(key)) handleDelete();
    else if (['ENTER', '='].includes(key)) evaluate();
    else if (['ESCAPE', 'c', 'C'].includes(key)) handleClear();
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

equalsButton.addEventListener('click', evaluate);

function convertOperator(key) {
    if (key === '/') return '÷';
    if (key === '*') return 'x';
    if (key === '-') return '-';
    if (key === '+') return '+';
}

function handleNumber(key){
    if (displayContainer.textContent==='0'|| displayContainer.textContent==='🤦') displayContainer.textContent = '';
    displayContainer.textContent += key;
};

function handleOperator(key){
    if (operator !== "") evaluate();
    if (displayContainer.textContent!=='🤦'){
        firstNum = displayContainer.textContent;
        operator = key;
        currentHistory = currentDisplay + " " + operator;
    }
}

function handleClear(){
    displayContainer.textContent = '0';
    displayHistoryContainer.textContent = '';
    operator = '';
    firstNum = '';
    secondNum = '';
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

function evaluate(){
    if (operator === null) return;
    if (operator === '÷' && displayContainer.textContent === '0'){
        displayHistoryContainer.textContent = null;
        displayContainer.textContent = "🤦";
        operator = '';
        return;
    }
    secondNum = displayContainer.textContent;
    displayContainer.textContent = round(operate(operator, parseFloat(firstNum), parseFloat(secondNum)));
    displayHistoryContainer.textContent = `${firstNum} ${operator} ${secondNum} =`;
    operator = null;
}

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case '+':
            return firstNum + secondNum;
        case '-':
            return firstNum - secondNum;
        case 'x':
            return firstNum * secondNum;
        case '÷':
            return firstNum / secondNum;
    }
}

function round(num) {
    return Math.round(num * 1000) / 1000;
}