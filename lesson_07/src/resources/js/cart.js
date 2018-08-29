$(function () {

    // Работа с корзиной
    class Cart {

        constructor(container, products) {
            this.container = container;
            this.products = products;
            this.items = [];
            this.initProducts();
            this.initCart();
        }

        initCart() {
            $(this.container).droppable({
                drop: (event, ui) => {
                    const name = $(ui.draggable[0]).data("name");
                    const price = $(ui.draggable[0]).data("price");
                    this.items.push({name: name, price: price});
                    this.renderCart();
                }
            });
            this.renderCart();
        }

        initProducts() {
            $(this.products).draggable({
                revert: true
            });
        }

        removeProduct(id) {
            this.items.splice(id, 1);
            this.renderCart();
        }

        renderCart() {
            $(`${this.container} div`).remove();
            if (this.items.length) {
                this.items.forEach((item, index) => {
                    $(this.container).prepend(`<div><div><h3>${item.name}</h3><p>${item.price} тугриков</p></div><div><a href="#" data-product-id="cart-product-id-${index}" title="Удалить">удалить</a></div></div>`);
                });
                $(`${this.container} div a`).on('click', (event) => {
                    event.preventDefault();
                    this.removeProduct($(event.target).data('product-id').replace('cart-product-id-', ''));
                });
            } else {
                $(this.container).prepend(`<div><p>Ваша корзина пуста.</p><p>&nbsp;</p><p>Перетаскивайте продукты из карусели сюда.</p></div>`);
            }
        }
    }

    new Cart('#cart', '.products .product');

});
