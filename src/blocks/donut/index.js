import Donut from './Donut';

const pies = document.querySelectorAll('.js-donut');

pies.forEach((item) => {
  const donut = new Donut(item);
  donut.draw();
});
