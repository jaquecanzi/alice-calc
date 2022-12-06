class Calculator {
  constructor(previousDisplay, currentDisplay) {
    this.previousDisplay = previousDisplay;
    this.currentDisplay = currentDisplay;
    this.clear();
  }

  clear() {
    this.currentDis = "";
    this.previousDis = "";
    this.operation = undefined;
  }

  delete() {
    this.currentDis = this.currentDis.toString().slice(0,-1)

  }

  appendNumber(number) {
    if (number === "." && this.currentDis.includes(".")) return;
    this.currentDis = this.currentDis.toString() + number.toString();
  }

  chooseOperation(operation) {
    if(this.currentDis === '') return
    if(this.previousDis !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousDis = this.currentDis
    this.currentDis = ''

  }

getDisplay(number) {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay
  
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0
    })
  } 

  if(decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}


  compute() {
    let computation
    const prev = parseFloat(this.previousDis)
    const current = parseFloat(this.currentDis)
    if(isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentDis = computation
    this.operation = undefined
    this.previousDis = ''
  }



  updateDisplay() {
    this.currentDisplay.innerText = 
      this.getDisplay(this.currentDis)
    if(this.operation != null) {
      this.previousDisplay.innerText =
      `${this.getDisplay(this.previousDis)} ${this.operation}`
    } else {

      this.previousDisplay.innerText = ''
    }
  }
}
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll(".data-operation");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousDisplay = document.querySelector("[data-previous-operand]");
const currentDisplay = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousDisplay, currentDisplay);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})