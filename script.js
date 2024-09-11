let count = 0;

const addToCartButton = document.getElementById('add-to-cart');
const addTwoButton = document.getElementById('add-two');
const resetButton = document.getElementById('reset');
const currentQuantityButton = document.getElementById('current-quantity');

addToCartButton.addEventListener('click', () => {
    count += 1;
});

addTwoButton.addEventListener('click', () => {
    count += 2;
});

resetButton.addEventListener('click', () => {
    count = 0;
    console.log('Cart was reset.');
});

currentQuantityButton.addEventListener('click', () => {
    console.log(`Current quantity: ${count}`);
});
