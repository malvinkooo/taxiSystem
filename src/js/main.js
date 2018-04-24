var ui = new UI();
var geoService = new GeoService();
var ordersList = new OrdersList();
var driversList = new DriversList();

driversList.addDriver({
    name:'Петр',
    surname: 'Иванов',
    phone: '1245757'
});
driversList.addDriver({
    name:'Василий',
    surname: 'Жуков',
    phone: '06547851'
});

ordersList.addOrder({
    clientName: 'Hlieb',
    driver: driversList.getDriver(0),
    clientPhone: '904820983423',
    carFeedPoint: 'Сухой Лиман',
    destination: 'Поселок Котовского',
    rate: 1
}, geoService);
ordersList.addOrder({
    clientName: 'Лена',
    driver: driversList.getDriver(1),
    clientPhone: '872498742',
    carFeedPoint: 'Поселок Котовского',
    destination: 'Сухой Лиман',
    rate: 1.5
}, geoService);

var ordersController = new OrdersController(ui, ordersList, driversList, geoService);
var driversController = new DriversController(ui, driversList);
ui.setOrdersController(ordersController);
ui.setDriversController(driversController);
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