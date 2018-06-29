class OrdersController {
    constructor(ui, orders, drivers, geoService) {
        this._ui = ui;
        this._orders = orders;
        this._drivers = drivers;
        this._geoService = geoService;
    }

    selectMenuItemAddOrder() {
        this._ui.showAddOrderForm();
    }

    addOrder(orderParams) {
        if(orderParams.isSetDriverAutomatically === true) {
            orderParams.driver = this._drivers.getRandomFreeDriver();
        } else {
            orderParams.driver = this._drivers.getDriver(orderParams.driver);
        }
        orderParams.driver.setStatus(DriverStatus.BUSY);
        GeoService.getDistance(orderParams.carFeedPoint, orderParams.destination).then((distance) => {
            orderParams.distance = distance;
            this._orders.addOrder(orderParams, geoService);
            var list = this._orders.getAllOrders();
            this._ui.showOrdersList(list);
        }).catch((error) => {
            console.error('Error occured while getting a distance, see details: ', error);
        });
    }

    selectMenuItemAllOrders() {
        var list = this._orders.getAllOrders();
        this._ui.showOrdersList(list);
    }

    selectOrder(id) {
        var order = this._orders.getOrder(id);
        this._ui.showOrder(order);
    }

    selectEditOrder(id) {
        var order = this._orders.getOrder(id);
        this._ui.showEditOrderForm(order);
    }

    editOrder(orderParams) {
        orderParams.driver = this._drivers.getDriver(orderParams.driver);
        GeoService.getDistance(orderParams.carFeedPoint, orderParams.destination).then((distance) => {
            orderParams.distance = distance;
            var order = this._orders.editOrder(orderParams);
            this._ui.showOrder(order);
        }).catch((error) => {
            console.error('Error occured while getting a distance, see details: ', error);
        });
        
    }
}