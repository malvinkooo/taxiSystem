//$('.main-tabs .item, .secondary.menu .item').tab();

var carsList = new CarsList();
var carsController = new CarsController(carsList);
window.ui = new UI(null, carsController, null, null);


//$('select.dropdown').dropdown();
//$('.ui.checkbox').checkbox();