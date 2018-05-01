var ui = new UI();
var geoService = new GeoService();
var ordersList = new OrdersList();
var carsList = new CarsList();
var driversList = new DriversList();

driversList.addDriver({
    name:'Петр',
    surname: 'Иванов',
    phone: '1245757',
    description: "Комментарий о водителе"
});
driversList.addDriver({
    name:'Василий',
    surname: 'Жуков',
    phone: '06547851',
    description: "Комментарий о водителе"
});
driversList.addDriver({
    name:'Прасковий',
    surname: 'Никитин',
    phone: '06547851',
    description: "Комментарий о водителе"
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
driversList.getDriver(0).setStatus(DriverStatus.BUSY);
driversList.getDriver(1).setStatus(DriverStatus.BUSY);
carsList.addCar({
    stateCarNumber: "4545445",
    brand: "Nissan",
    gasolineConsumptionRatio: 1.77,
    description: "Краткий комментарий о машине"
});

var ordersController = new OrdersController(ui, ordersList, driversList, geoService);
var carsController = new CarsController(ui, carsList);
var driversController = new DriversController(ui, driversList);
ui.setOrdersController(ordersController);
ui.setDriversController(driversController);
ui.setCarsController(carsController);
ordersController.selectMenuItemAllOrders();