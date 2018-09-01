$(function () {

    const cart = $('#cart').Cart('http://89.108.65.123:8080');
    cart.getCart();
    cart.initAddButton();

});
