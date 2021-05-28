import "air-datepicker"

class Calendar {
    constructor(element) {
        this.element = element;

        this.makeDatepicker();
        this.addHandlers();
    }

    hideContainer() {
        this.element.style.display = 'none';
    }

    makeDatepicker() {
        this.inputs = $(this.element).parent().find('input');

        if (this.inputs.length <= 0) {
            this.isStatic = true;
        } else {
            this.hideContainer();
        }

        const options = {
            range: true,
            multipleDates: true,
            onSelect: this.onSelect.bind(this),
            prevHtml: '<i class="material-icons">arrow_back</i>',
            nextHtml: '<i class="material-icons">arrow_forward</i>',
            navTitles: {
                days: 'MM yyyy',
            },
        };

        if (this.isStatic) {
            this.datepicker = $(this.element).datepicker(options).data('datepicker');
        } else {
            this.datepicker = $(this.inputs[0]).datepicker(options).data('datepicker');
        }

        this.$clearButton = $('<span class="calendar__clear-button">Очистить</span>');
        this.$applyButton = $('<span class="calendar__apply-button">Применить</span></div>');
        const $btnContainer = $('<div class="calendar__footer">')
            .append(this.$clearButton)
            .append(this.$applyButton);

        $(this.datepicker.$datepicker).append($btnContainer);
    }

    addHandlers() {
        this.$clearButton.on('click', this.onClickClear.bind(this));
        this.$applyButton.on('click', this.onClickApply.bind(this));
        if (!this.isStatic) {
            this.inputs.on('click', this.onClickInput.bind(this));
            this.datepicker.hide();
        }
    }

    clearInputs() {
        this.inputs.each((index) => {
            this.inputs[index].value = '';
        });
    }

    onSelect(_, date) {
        this.dates = date;
        this.clearInputs();
    }

    onClickClear() {
        this.clearInputs();
        this.datepicker.clear();
    }

    onClickInput() {
        this.datepicker.show();
    }

    onClickApply() {
        if (this.dates.length < 2) {
            return;
        }
        this.inputs.each((index, input) => {
            $(input).val(this.dates[index].toLocaleDateString());
        });

        this.datepicker.hide();
    }
}

export default Calendar;