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
        if(orderParams.isSetDriverAutomatically === 'true') {
            orderParams.driver = this._drivers.getRandomFreeDriver();
        }
        this._orders.addOrder(orderParams, geoService);
        var list = this._orders.getAllOrders();
        this._ui.showOrdersList(list);
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
        var order = this._orders.editOrder(orderParams);
        this._ui.showOrder(order);
    }
}