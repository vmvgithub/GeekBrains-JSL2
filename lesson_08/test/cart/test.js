$(function () {

    $('body').prepend('<div id="mocha"></div>');

    mocha.setup('bdd');

    const assert = chai.assert;

    describe('Тест корзины', () => {

        let cart;

        before(() => {
            cart = $('#cart').Cart('http://89.108.65.123:8080');
            cart.initAddButton();
        });

        it('Инициализируем корзину', async () => {
            await cart.getCart();
            assert.isNotNull(cart.data);
        });

        it('Добавляем продукты', async function () {
            const allProducts = 3;
            for (let i = 1; i <= allProducts; i++) {
                let price = (1000 + Math.random() * 1000).toFixed(2);
                await cart.addProduct(`Продукт ${i}`, price);
            }
            assert.equal(cart.data.cart.length, allProducts);
        });

        it('Удаляем продукты', async function () {
            while (cart.data.cart.length > 0) {
                await cart.removeProduct(cart.data.cart[0].product_id);
            }
            assert.equal(cart.data.cart.length, 0);
        });

        it('Снова добавляем продукты', async () => {
            const allProducts = 2;
            for (let i = 1; i <= allProducts; ++i) {
                let price = (1000 + Math.random() * 1000).toFixed(2);
                await cart.addProduct(`Продукт ${i}`, price);
            }
            assert.equal(cart.data.cart.length, allProducts);
        });

    });

    mocha.run();

});