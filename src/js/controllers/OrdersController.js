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
        }

        return GeoService.getDistance(orderParams.carFeedPoint, orderParams.destination)
            .then((distance) => {
                orderParams.distance = distance;
                return this._orders.addOrder(orderParams);
            });
    }

    selectMenuItemAllOrders() {
        this._ui.showOrdersList();
    }

    editOrder(orderParams) {
        orderParams.driver = this._drivers.getDriver(orderParams.driver);
        GeoService.getDistance(orderParams.carFeedPoint, orderParams.destination).then((distance) => {
            orderParams.distance = distance;
            var order = this._orders.editOrder(orderParams);
        }).catch((error) => {
            console.error('Error occured while getting a distance, see details: ', error);
        });

    }
}