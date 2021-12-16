//set constants
const calculatorDisplay=document.querySelector('h1');
const inputBtns=document.querySelectorAll('button')
const clearBtn=document.getElementById('clear-btn');

//Calculate first and second values depending on operator
const calculate={
    '/': (firstNumber, secondNumber) => firstNumber/secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber*secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber+secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber-secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

//Changeable variables
let firstValue=0;
let operatorValue='';
let awaitingNextValue=false;

function sendNumberValue(number) {
  //Replace current display value if first vlue is entered
  if(awaitingNextValue) {
      calculatorDisplay.textContent=number;
      awaitingNextValue=false;
  }else {
    //If current display value is 0, replace it, if not add number
    const displayValue=calculatorDisplay.textContent;
    calculatorDisplay.textContent=displayValue==='0' ? number : displayValue+number;
  }
}
//In case someone tries to put in a second decimal
function addDecimal() {
    //If operator pressed don't add decimal
    if(awaitingNextValue) return;
    //If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`;
    }
}
//Functionality
function useOperator(operator) {
    const currentValue=Number(calculatorDisplay.textContent);
    //Prevent multiple operators
    if(operatorValue && awaitingNextValue){
        operatorValue=operator;
        return;
    }
    //Assign first Value if no value
    if(!firstValue) {
        firstValue=currentValue;
    }else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent=calculation;
        firstValue=calculation;
    }
    //Ready for the next value, store operator
    awaitingNextValue=true;
    operatorValue=operator;
}
//Reset display
function resetAll() {
    firstValue=0;
    operatorValue='';
    awaitingNextValue=false;
    calculatorDisplay.textContent='0';
}
//Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length===0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value, operatorValue));
    }else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

//Event Listener
clearBtn.addEventListener('click', resetAll);