$(function () {

    // Работа с корзиной
    class Cart {

        constructor(baseUrl, container) {
            this.container = container;
            this.baseUrl = baseUrl;
            this.data = null;
        }

        async addProduct(name, price) {
            try {
                await $.ajax({
                    url: `${this.baseUrl}/shop?user_id=${this.data.user_id}&product=${name}&price=${price}`,
                    type: 'POST',
                    success: (data) => {
                        this.data.cart.push(data);
                        this.render();
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }

        async removeProduct(id) {
            try {
                await $.ajax({
                    url: `${this.baseUrl}/shop?user_id=${this.data.user_id}&product_id=${id}`,
                    type: 'DELETE',
                    success: (data) => {
                        this.data = data;
                        this.render();
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }

        async getCart() {
            try {
                await $.ajax({
                    url: `${this.baseUrl}/shop` + ((this.data) ? `?user_id=${this.data.user_id}` : ''),
                    dataType: "json",
                    success: (data) => {
                        this.data = data;
                        this.render();
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }

        render() {
            if (this.data) {
                let total = 0;
                $(this.container).find('div').remove();
                this.data.cart.forEach((item) => {
                    $(this.container).prepend(`<div><div><h3>${item.product}</h3><p>${item.price} тугриков</p></div><div><a href="#" data-product-id="${item.product_id}" title="Удалить">удалить</a></div></div>`);
                    total += Number(item.price);
                });
                $(this.container).find('div a').on('click', (event) => {
                    event.preventDefault();
                    this.removeProduct($(event.target).data('product-id'));
                });
                $(this.container).find('span').empty();
                if (total) {
                    $(this.container).find('span').html(`<strong>Итого:</strong> ${total.toFixed(2)} тугриков`);
                }
            }
        }

        initAddButton() {
            $(this.container).find('form a').on('click', (event) => {
                event.preventDefault();
                const price = $(this.container).find('form select').val();
                const name = $(this.container).find('form select option:selected').text();
                this.addProduct(name, price);
            });
        }
    }

    $.fn.Cart = function (baseUrl) {
        return new Cart(baseUrl, this);
    };

});
