function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
   
    let functions =
    {
        ['+']: (x, y) => +x + +y,
        ['-']: (x, y) => +x - +y,
        ['*']: (x, y) => +x * +y,
        ['/']: (x, y) => y == '0' ? "TypeError: Division by zero." : +x / +y
    }

    let arrayRPN = [];
    let stack = [];

    let firstPriority = ['/', '*']
    let secondPriority = ['+', '-']
    let funcArray = ['(', ')'].concat(firstPriority).concat(secondPriority)

    let number = '';

    for (let i = 0; i < expr.length; i++) {

        if (expr[i] === ' ') { continue }

        if (funcArray.includes(expr[i])) {
            if (number !== '') {
                arrayRPN.push(number);
                number = '';
            }

            while (true) {
                if (expr[i] === ')' && stack.length === 0) {
                    throw "ExpressionError: Brackets must be paired"
                }
                else if (stack.length === 0
                    || firstPriority.includes(expr[i]) && secondPriority.includes(stack[stack.length - 1])
                    || expr[i] === '('
                    || stack[stack.length - 1] === '(' && expr[i] !== ')') {
                    stack.push(expr[i]);
                    break
                }
                else if (expr[i] === ')' && stack[stack.length - 1] === '(') {
                    stack.pop()
                    break
                }
                else { arrayRPN.push(stack.pop()) }
            }
        }
        else {
            number = `${number}${expr[i]}`
        }
    }
    
    if (number !== '') {
        arrayRPN.push(number);		
    }

    for (let j = stack.length; j > 0; j--) {
        if (stack[j - 1] === '(') { throw "ExpressionError: Brackets must be paired" }
        arrayRPN.push(stack[j - 1])
    }

    //second part
    let resultArray = []

    for (let i = 0; i < arrayRPN.length; i++) {

        if (funcArray.includes(arrayRPN[i])) {
            let secondNumber = resultArray.pop();
            let firstNumber = resultArray.pop();

            let resultNumber = functions[arrayRPN[i]](firstNumber, secondNumber)

            if (typeof resultNumber === "number") {
                resultArray.push(resultNumber);
            } else {
                throw resultNumber
            }
        }
        else {
            resultArray.push(arrayRPN[i])
        }

    }

    return resultArray[0]

}

module.exports = {
    expressionCalculator
}