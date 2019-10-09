function ExpressionError(message) {
	this.message = message;
	this.name = "ExpressionError";
	return this.message;
 }

 function TypeError(message) {
	this.message = message;
	this.name = "TypeError";
	return this.message;
 }

 function checkExpression (expression, operator) {
	const result = [];
	let braces = 0;
	let currentItem = "";
	for (let i = 0; i < expression.length; ++i) {
		const curPos = expression[i];
		if (curPos === '(') {
			braces++;
		} else if (curPos == ')') {
			braces--;
		}
		if (braces === 0 && operator === curPos) {
			result.push(currentItem);
			currentItem = "";
		} else currentItem += curPos;
	}
	if (currentItem != "") {
		result.push(currentItem);
	}
	return result;
};

function devideExpression (expression) {
	const numbersString = checkExpression (expression, '/');
	const numbers = numbersString.map(noStr => {
		if (noStr[0] === '(') {
				const expr = noStr.substr(1, noStr.length - 2);
				return plusExpression(expr);
				}
		 return +noStr
	});
	const initialValue = 1.0;
	const result = numbers.reduce((acc, no) => {
		if (no === 0){
			throw new TypeError('TypeError: Division by zero.')
		}
	return acc / no
});
	return result;
};

    function multiplicationExpression (expression) {
	const numbersString = checkExpression (expression, '*');
	const numbers = numbersString.map(noStr => devideExpression(noStr));
	const initialValue = 1.0;
	const result = numbers.reduce((acc, no) => acc * no, initialValue);
	return result;
};

    function minusExpression (expression) {
	const numbersString = checkExpression (expression, '-');
	const numbers = numbersString.map(noStr => multiplicationExpression(noStr));
	const initialValue = numbers[0];
	const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
	return result;
};

    function plusExpression (expression) {
	const numbersString = checkExpression (expression, '+');
	const numbers = numbersString.map(noStr => minusExpression(noStr));
	const initialValue = 0;
	const result = numbers.reduce((acc, no) => {return acc + no;}, initialValue);
	return result;
};

function eval(str) {
	let brackets = [];
	let arr = str.trim().split(' ').join('').split('');
	arr.forEach(element => {
		if (element === ')' && brackets.length === 0) {
			throw new ExpressionError("ExpressionError: Brackets must be paired"); 
		}
		else if (element === '(') {
			brackets.push(element);
		}
		else if (element === ')' && brackets.length > 0) {
			brackets.pop();
		}
		});
		if (brackets.length > 0) {
			throw new ExpressionError("ExpressionError: Brackets must be paired");
		}
		let newArr = str.trim().split(' ').join('');
		return plusExpression(newArr);
}

function expressionCalculator(expr) {
    return eval(expr);
}

module.exports = {
    expressionCalculator
}