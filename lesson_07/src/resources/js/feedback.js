$(function () {

    // Работа с формой обратной связи
    class FeedBack {

        constructor(container, baseUrl) {
            this.container = container;
            this.baseUrl = baseUrl;
            this.dialog = this.initDialogWidget();
            this.initCityField();
            this.initBirthDayField();
            this.initSendButton();
        }

        async initCityField() {
            await $.ajax({
                url: `${this.baseUrl}/cities/`,
                dataType: "json",
                success: (data) => {
                    if (data.length === 0) {
                        this.showDialog('Не удалось загрузить список городов.', 'error');
                        return;
                    }
                    $(`${this.container} #city`).autocomplete({
                        source: data.map(function (city, index) {
                            return {label: city.name, id: `city-${index}`};
                        }),
                        minLength: 3,
                        select: (event, ui) => {
                            const city = data[ui.item.id.replace('city-', '')];
                            this.showDialog(
                                    `<p><strong>Название:</strong> ${city.name}</p>
                                                 <p><strong>Округ:</strong> ${city.district}</p>
                                                 <p><strong>Субъект:</strong> ${city.subject}<p/>
                                                 <p><strong>Численность:</strong> ${city.population}</p>
                                                 <p><strong>Широта:</strong> ${city.coords.lat}</p>
                                                 <p><strong>Долгота:</strong> ${city.coords.lon}</p>`,
                                    'info');
                        }
                    });
                },
                error: () => {
                    this.showDialog('Не удалось загрузить список городов.', 'error');
                }
            });
        }

        initBirthDayField() {
            $(`${this.container} #birthday`).datepicker({
                dateFormat: "dd.mm.yy",
                changeMonth: true,
                changeYear: true,
                monthNamesShort: [
                    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                ],
                dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
            });
        }

        initSendButton() {
            $(`${this.container} #send`).on('click', (event) => {
                this.sendForm(event);
            });
        }

        initDialogWidget() {
            return $(`${this.container} #dialog`).dialog({
                autoOpen: false,
                width: '400px'
            });
        }

        showDialog(message, type) {
            if (type === 'error') {
                this.dialog.dialog('option', 'title', 'Ошибка');
                this.dialog.dialog("option", "classes.ui-widget-header", "ui-widget-header-error");
            } else {
                this.dialog.dialog('option', 'title', 'Информация');
                this.dialog.dialog("option", "classes.ui-widget-header", "ui-widget-header-info");
            }
            this.dialog.html(message);
            this.dialog.dialog('open');
        }

        hideDialog() {
            this.dialog.dialog('close');
        }

        sendForm(event) {
            const form = this.getForm();
            this.hideDialog();
            if (this.checkFormData(form)) {
                this.showDialog('<p>Ваше сообщение отправлено.</p>', 'info');
                this.resetForm(form);
            }
            event.preventDefault();
        }

        getForm() {
            return {
                'name': $(`${this.container} #name`).css('border', '1px solid gainsboro'),
                'phone': $(`${this.container} #phone`).css('border', '1px solid gainsboro'),
                'email': $(`${this.container} #email`).css('border', '1px solid gainsboro'),
                'birthday': $(`${this.container} #birthday`).css('border', '1px solid gainsboro'),
                'city': $(`${this.container} #city`).css('border', '1px solid gainsboro'),
                'text': $(`${this.container} #text`).css('border', '1px solid gainsboro')};
        }

        checkFormData(form) {
            let message = "";
            if (!/^[a-zа-яёA-ZА-ЯЁ]+$/.test(form.name.val())) {
                this.invalidFiled(form.name);
                message += '<p>Имя должно содержать только буквы.</p>';
            }
            if (!/^\+7\(\d{3}\)\d{3}-\d{4}$/.test(form.phone.val())) {
                this.invalidFiled(form.phone);
                message += '<p>Указан неправильный формат телефона.</p>';
            }
            if (!/([a-zA-Z0-9-_\.]+)(@)([a-zA-Z0-9-_\.]+)\.([a-z]{2,})/.test(form.email.val())) {
                this.invalidFiled(form.email);
                message += '<p>Указан неправильный формат E-mail.</p>';
            }
            if (form.birthday.val().trim() === "") {
                this.invalidFiled(form.birthday);
                message += '<p>Вы не сообщили день рождения.</p>';
            }
            if (form.city.val().trim() === "") {
                this.invalidFiled(form.city);
                message += '<p>Вы не выбрали город.</p>';
            }
            if (form.text.val().trim() === "") {
                this.invalidFiled(form.text);
                message += '<p>Текст не должен быть пустым.</p>';
            }
            if (message !== "") {
                this.showDialog(message, 'error');
            }
            return message === "";
        }

        invalidFiled(field) {
            field.css('border', '1px solid #d74a5c').toggle("bounce").toggle("bounce");
        }

        resetForm(form) {
            form.name.val('');
            form.phone.val('');
            form.email.val('');
            form.birthday.val('');
            form.city.val('');
            form.text.val('');
        }

    }

    new FeedBack('#feedback', 'http://89.108.65.123');

});
