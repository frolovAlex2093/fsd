/* global $ */
import 'ion-rangeslider';

class Slider {
    constructor() {
        this.init();
    }

    init() {
        const element = $('.js-range-slider');
        this.minMax = element.parent().find('.slider__min-max');

        this.slider = element.ionRangeSlider({
            hide_from_to: true,
            onChange: this.updateLabel.bind(this),
            onStart: this.onStart.bind(this),
        });
    }

    updateLabel(data) {
        $(this.minMax).html(`${data.from_pretty}&#8381; - ${data.to_pretty}&#8381;`);
    }

    onStart(data) {
        this.updateLabel(data);
    }
}

export default Slider;