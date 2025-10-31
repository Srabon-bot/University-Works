document.addEventListener('DOMContentLoaded', function() {
    const showTableBtn = document.getElementById('showTableBtn');
    const resultContainer = document.getElementById('resultContainer');

    showTableBtn.addEventListener('click', function() {
        const number = prompt('Enter a number to generate its multiplication table:');
        
        if (number === null) {
            return;
        }

        if (isNaN(number) || number === '') {
            alert('Please enter a valid number.');
            return;
        }

        let table = `<h2>Multiplication Table for ${number}</h2>`;
        for (let i = 1; i <= 10; i++) {
            table += `${number} x ${i} = ${number * i}<br>`;
        }

        resultContainer.innerHTML = table;
        resultContainer.style.display = 'block';
    });
});
