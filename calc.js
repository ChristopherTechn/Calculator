document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelector('.calculator-keys');
    const display = document.querySelector('.calculator-screen');
    let previousKeyType = '';

    keys.addEventListener('click', e => {
        if (!e.target.matches('button')) return;

        const key = e.target;
        const keyContent = key.textContent;
        const displayedNum = display.value;
        const action = key.dataset.action;

        // Reset previousKeyType for the next operation
        previousKeyType = action || 'number';

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.value = keyContent;
            } else {
                display.value = displayedNum + keyContent;
            }
        }

        if (key.classList.contains('operator')) {
            key.parentElement.dataset.firstValue = displayedNum;
            key.parentElement.dataset.operator = key.value;
        }

        if (key.classList.contains('equal-sign')) {
            const firstValue = key.parentElement.dataset.firstValue;
            const operator = key.parentElement.dataset.operator;
            const secondValue = displayedNum;
            display.value = calculate(firstValue, operator, secondValue);
        }

        if (key.classList.contains('all-clear')) {
            display.value = '0';
        }
    });

    function calculate(firstValue, operator, secondValue) {
        firstValue = parseFloat(firstValue);
        secondValue = parseFloat(secondValue);
        if (operator === '+') return firstValue + secondValue;
        if (operator === '-') return firstValue - secondValue;
        if (operator === '*') return firstValue * secondValue;
        if (operator === '/') return firstValue / secondValue;
    }
});
