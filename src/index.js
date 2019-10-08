function parseDevideSeparatedExpression (expression) {
	const numbersString = expression.split('/');
	const numbers = numbersString.map(noStr => +noStr);
	const initialValue = 1.0;
	const result = numbers.reduce((acc, no) => {
    return acc / no});
	return result;
};

    function parseMultiplicationSeparatedExpression (expression) {
	const numbersString = expression.split('*');
	const numbers = numbersString.map(noStr => parseDevideSeparatedExpression(noStr));
	const initialValue = 1.0;
	const result = numbers.reduce((acc, no) => acc * no, initialValue);
	return result;
};

    function parseMinusSeparatedExpression (expression) {
	const numbersString = expression.split('-');
	const numbers = numbersString.map(noStr => parseMultiplicationSeparatedExpression(noStr));
	const initialValue = numbers[0];
	const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
	return result;
};

    function parsePlusSeparatedExpression (expression) {
	const numbersString = expression.trim().split(' ').join('').split('+');
	const numbers = numbersString.map(noStr => parseMinusSeparatedExpression(noStr));
	const initialValue = 0.0;
	const result = numbers.reduce((acc, no) => acc + no, initialValue);
	return result;
};

function eval(expr) {
    return parsePlusSeparatedExpression(expr);
}

function expressionCalculator(expr) {
    return eval(expr);
}

module.exports = {
    expressionCalculator
}