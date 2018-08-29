$(function () {

    // Работа с каруселью популярных товаров
    class Products {

        constructor(container) {
            this.container = container;
            this.allProducts = $(`${this.container} .product`).length;
            this.currentProduct = 1;
            this.initProducts();
            this.initArrows();
            this.showCounter();
        }

        initProducts() {
            $.each($(`${this.container} .product`), (index, product) => {
                const name = $(product).data('name');
                const price = $(product).data('price');
                $(product).html(`<h3>${name}</h3><p>${price} тугриков</p>`);
            });
        }

        initArrows() {
            $(`${this.container} .arrow-left`).on('click', () => {
                this.onArrowLeft();
            });
            $(this.container + ' .arrow-right').on('click', () => {
                this.onArrowRight();
            });
        }

        onArrowLeft() {
            $('.product').hide();
            this.currentProduct = (this.currentProduct > 1) ? --this.currentProduct : this.allProducts;
            $(`${this.container} .product:nth-child(${(this.currentProduct + 1)})`).show();
            this.showCounter();
        }

        onArrowRight() {
            $('.product').hide();
            this.currentProduct = (this.currentProduct < this.allProducts) ? ++this.currentProduct : 1;
            $(`${this.container} .product:nth-child(${(this.currentProduct + 1)})`).show();
            this.showCounter();
        }

        showCounter() {
            $(`${this.container} span`).html(`${this.currentProduct} / ${this.allProducts}`);
        }
    }

    new Products('.products');

});

