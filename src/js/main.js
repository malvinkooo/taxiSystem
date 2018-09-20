var geoService = new GeoService();
var ordersList = new OrdersList();
var carsList = new CarsList();
var driversList = new DriversList();
var ui = new UI(driversList, carsList, ordersList);
var decorator = new JQueryValDecorator();

validate.validators.address = function(value, options) {
    if(!value.isValid()) {
        return options.message;
    }
}

var ordersController = new OrdersController(ui, ordersList, driversList, geoService);
var carsController = new CarsController(ui, carsList);
var driversController = new DriversController(ui, carsList, driversList);
ui.setOrdersController(ordersController);
ui.setDriversController(driversController);
ui.setCarsController(carsController);
ordersController.selectMenuItemAllOrders();