let variableOne = [];
let operatorValue = undefined;
let variableTwo = [];

const calculatorContainer = document.querySelector('#calculator-container');
let decimalAdded = false; // initialize the flag

calculatorContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        const buttonValue = e.target.value;

        if (operatorValue === undefined) {
            assignVariableOne(buttonValue);
        } else if (operatorValue !== undefined) {
            assignVariableTwo(buttonValue);
        }
        
    }
});

const currentOperandContainer = document.getElementById('current-operand-container');
function updateCurrentOperandContainer(e) {
    let display = e.join('');
    if (display === '') {
        currentOperandContainer.textContent = '';
    } else {
        display = parseFloat(display);
        currentOperandContainer.textContent = display;
    }
};

const previousOperandContainer = document.getElementById('previous-operand-container');
function updatePreviousOperandContainer(variableOne, operatorValue) {
    let display = variableOne.join('');
    display = `${parseFloat(display)} ${operatorValue}`;
    currentOperandContainer.textContent = "";
    previousOperandContainer.textContent = display;
}

function assignVariableOne(buttonValue) {
    switch (buttonValue) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            variableOne.push(buttonValue);
            updateCurrentOperandContainer(variableOne);
            break;
        case '.':
            if (!decimalAdded) { // check if a decimal point has already been added
                variableOne.push(buttonValue);
                updateCurrentOperandContainer(variableOne);
                decimalAdded = true; // set flag to true
            }
            break;
        case 'clear':
            clearDisplay();
            break;
        case 'delete':
            deleteValue(variableOne);
            updateCurrentOperandContainer(variableOne);
            break;
        case 'percent':
            variableOne = percentConversion(variableOne);
            break;
        case 'divide':
            operatorValue = '÷';
            updatePreviousOperandContainer(variableOne, operatorValue);
            decimalAdded = false;
            break;
        case 'multiply':
            operatorValue = 'x';
            updatePreviousOperandContainer(variableOne, operatorValue);
            decimalAdded = false;
            break;
        case 'subtract':
            operatorValue = '-';
            updatePreviousOperandContainer(variableOne, operatorValue);
            decimalAdded = false;
            break;
        case 'add':
            operatorValue = '+';
            updatePreviousOperandContainer(variableOne, operatorValue);
            decimalAdded = false;
            break;
    }
}

function assignVariableTwo(buttonValue) {
    switch (buttonValue) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            variableTwo.push(buttonValue);
            updateCurrentOperandContainer(variableTwo);
            break;
        case '.':
            if (!decimalAdded) { // check if a decimal point has already been added
                variableTwo.push(buttonValue);
                updateCurrentOperandContainer(variableTwo);
                decimalAdded = true; // set flag to true
            }
            break;
        case 'clear':
            clearDisplay();
            break;
        case 'delete':
            deleteValue(variableTwo);
            updateCurrentOperandContainer(variableTwo);
            break;
        case 'percent':
            variableTwo = percentConversion(variableTwo);
            break;
        case 'divide':
            console.log(`variableOne = ${variableOne}`);
            console.log(`operatorValue = ${operatorValue}`);
            console.log(`variableTwo = ${variableTwo}`);
            evaluateExpression(variableOne, operatorValue, variableTwo);
            console.log(`variableOne After = ${variableOne}`);
            console.log(`operatorValue After= ${operatorValue}`);
            console.log(`variableTwo After= ${variableTwo}`);
            operatorValue = '÷';
            updatePreviousOperandContainer(variableOne, operatorValue);
            decimalAdded = false;
            break;
        case 'multiply':
            console.log(`variableOne = ${variableOne}`);
            console.log(`operatorValue = ${operatorValue}`);
            console.log(`variableTwo = ${variableTwo}`);
            evaluateExpression(variableOne, operatorValue, variableTwo);
            console.log(`variableOne After = ${variableOne}`);
            console.log(`operatorValue After= ${operatorValue}`);
            console.log(`variableTwo After= ${variableTwo}`);
            operatorValue = 'x';
            updatePreviousOperandContainer(variableOne, operatorValue);
            decimalAdded = false;
            break;
        case 'subtract':
            evaluateExpression(variableOne, operatorValue, variableTwo);
            operatorValue = '-';
            updatePreviousOperandContainer(variableOne, operatorValue);
            decimalAdded = false;
            break;
        case 'add':
            evaluateExpression(variableOne, operatorValue, variableTwo);
            operatorValue = '+';
            updatePreviousOperandContainer(variableOne, operatorValue);
            decimalAdded = false;
            break;
        case 'equals':
            evaluateExpression(variableOne, operatorValue, variableTwo);
            break;
    }
}

function evaluateExpression(variableOne, operatorValue, variableTwo) {
    switch (operatorValue) {
        case '÷':
            divide(variableOne, variableTwo);
            break;
        case 'x':
            multiply(variableOne, variableTwo);
            break;
        case '-':
            subtract(variableOne, variableTwo);
            break;
        case '+':
            add(variableOne, variableTwo);
            break;
    }
    return;
}

function clearDisplay() {
    variableOne.length = 0;
    operatorValue = undefined;
    variableTwo.length = 0;
    decimalAdded = false;
    currentOperandContainer.textContent = "";
    previousOperandContainer.textContent = "";
}

function deleteValue(e) {
    e.pop()
}

// Math functions
function add(variableOne, variableTwo) {
    let a = parseFloat(variableOne.join('')) || 0;
    let b = parseFloat(variableTwo.join('')) || 0;
    answer = a + b;
    variableOne.length = 0;
    variableOne.push(...answer.toString().split(""));
    variableTwo.length = 0;
    currentOperandContainer.textContent = answer;
    previousOperandContainer.textContent = "";
}

function subtract(variableOne, variableTwo) {
    let a = parseFloat(variableOne.join('')) || 0;
    let b = parseFloat(variableTwo.join('')) || 0;
    answer = a - b;
    variableOne.length = 0;
    variableOne.push(...answer.toString().split(""));
    variableTwo.length = 0;
    currentOperandContainer.textContent = answer;
    previousOperandContainer.textContent = "";
}

function multiply(variableOne, variableTwo) {
    let a = parseFloat(variableOne.join('')) || 0;
    let b = parseFloat(variableTwo.join('')) || 0;
    answer = a * b;
    variableOne.length = 0;
    variableOne.push(...answer.toString().split(""));
    variableTwo.length = 0;
    currentOperandContainer.textContent = answer;
    previousOperandContainer.textContent = "";
}

function divide(variableOne, variableTwo) {
    let a = parseFloat(variableOne.join('')) || 0;
    let b = parseFloat(variableTwo.join('')) || 0;
    if (b === 0) {
        currentOperandContainer.textContent = "lmao";
        previousOperandContainer.textContent = "";
        variableTwo.length = 0;
    } else {
        answer = a / b;
        variableOne.length = 0;
        variableOne.push(...answer.toString().split(""));
        variableTwo.length = 0;
        currentOperandContainer.textContent = answer;
        previousOperandContainer.textContent = "";
    }
}

function percentConversion(e) {
    parsedNumber = parseFloat(e.join(''));
    if (parsedNumber.toString().includes('.')) {
        answer = parsedNumber * 100;
        e.length = 0;
        e.push(...answer.toString().split(""));
        currentOperandContainer.textContent = answer;
    } else {
        answer = parsedNumber / 100;
        e.length = 0;
        e.push(...answer.toString().split(""));
        currentOperandContainer.textContent = answer;
    }
    return e;
}

// 9 + 2 = [ans] % [ans] + \\ success
// 9 - 2 = [ans] % [ans] - \\ success
// 9 * 2 = [ans] % [ans] * \\ fail - variableOne becomes "0"
// 9 ÷ 2 = [ans] % [ans] ÷ \\ fail - variableOne becomes "NaN"