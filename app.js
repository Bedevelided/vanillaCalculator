// // change themes
let themeSelector = [...document.querySelectorAll('.span-btn span')];
const mainBackground = document.querySelector('.main');
// const keypadS = document.querySelectorAll('[data-num]');
// const operations= document.querySelectorAll('[data-function]');
// const calculate = document.querySelector('[data-operate]')

// let previousValue;
// let currentValue;
// let operation;


// let screenV = document.querySelector('.screen');

themeSelector.forEach(function(span){
    span.addEventListener('click' , function(){
        
        themeSelector.forEach(function(element){
            element.classList.remove('active');
        })
        span.classList.add('active')

        if(span.classList.contains('th-1')){
            mainBackground.classList.add('theme-1');
            mainBackground.classList.remove('theme-2');
            mainBackground.classList.remove('theme-3');
            
        }else if(span.classList.contains('th-2')){
            mainBackground.classList.add('theme-2')
            mainBackground.classList.remove('theme-1');
            mainBackground.classList.remove('theme-3');
            
        }else{
            mainBackground.classList.add('theme-3')
            mainBackground.classList.remove('theme-2');
            mainBackground.classList.remove('theme-1');
        }
    })
})



class Calculator{
    constructor(previousOperandTextElement , currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0 , -1)

    }
    appendNumber(number){
        if(number === '.'  && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '/':
                computation = prev / current;
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1]
        // const floatNumber = parseFloat(number);
        // if(isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')
        // return number
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en' , {
                maximumFractionDigits:0
            }) 
        }if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.value = this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.value = this.previousOperand;

    }
}

const numberButtons = document.querySelectorAll('[data-number]');


const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const resetBtn = document.querySelector('[data-reset]');

const currentOperandTextElement = document.getElementById('screenInput');
const previousOperandTextElement = document.getElementById('previousoperand');
const calculator = new Calculator(previousOperandTextElement , currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click' , function(){
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
       
    })
})

operationButtons.forEach(opt =>{
    opt.addEventListener('click' , function(){
        calculator.chooseOperation(opt.innerText)
        calculator.updateDisplay()
       
    })
})
equalsButton.addEventListener('click' , function(button){
    calculator.compute();
    calculator.updateDisplay();
})

resetBtn.addEventListener('click' , function(){
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click' , function(button){
   calculator.delete();
   calculator.updateDisplay();
})

// check out the original soure code for the javascript
// next updating with my own version of javascript
// https://www.youtube.com/watch?v=j59qQ7YWLxw