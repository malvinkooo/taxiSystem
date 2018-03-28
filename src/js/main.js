var ui = new UI();
var geoService = new GeoService();
var ordersList = new OrdersList();

ordersList.addOrder({
    clientName: 'Hlieb',
    driver: 'Вася Пупкин',
    clientPhone: '904820983423',
    carFeedPoint: 'Сухой Лиман',
    destination: 'Поселок Котовского',
    rate: 1
}, geoService);

ordersList.addOrder({
    clientName: 'Лена',
    driver: 'Вася Пупкин',
    clientPhone: '872498742',
    carFeedPoint: 'Поселок Котовского',
    destination: 'Сухой Лиман',
    rate: 1.5
}, geoService);

var driversList = new DriversList();
var ordersController = new OrdersController(ui, ordersList, driversList, geoService);
ui.setOrdersController(ordersController);
ordersController.selectMenuItemAllOrders();
//$('.main-tabs .item, .secondary.menu .item').tab();
// var carsList = new CarsList();
// var carsController = new CarsController(ui, carsList);

// $('#addCarForm div.ui.submit.button').click(function() {
//     $(this).addClass('disabled');
//     var brand = $('#addCarForm input[name=brand]').val();
//     var stateCarNumber = $('#addCarForm input[name=stateCarNumber]').val();
//     var gasolineConsumptionRatio = $('#addCarForm input[name=gasolineConsumptionRatio]').val();
//     carsController.addCar(stateCarNumber, stateCarNumber, gasolineConsumptionRatio);
// });
// $('select.dropdown').dropdown();
// $('.ui.checkbox').checkbox();