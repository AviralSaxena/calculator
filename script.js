function addNumbers (num1,num2){
    return num1+num2;
};

function subtractNumbers (num1,num2){
    return num1-num2;
}

function multiplyNumbers (num1,num2){
    return num1*num2;
}

function divideNumbers (num1,num2){
    return num1/num2;
}

let firstNum;
let secondNum;
let operator = "";

function operate (operator, firstNum, secondNum){
    switch (operator){
        case '+':
            addNumbers(firstNum,secondNum);
            break
        case '-':
            subtractNumbers(firstNum,secondNum);
            break
        case '*':
            multiplyNumbers(firstNum,secondNum);
            break
        case '/':
            divideNumbers(firstNum,secondNum);
            break
        default:
            return "Syntax Error";
    }
}