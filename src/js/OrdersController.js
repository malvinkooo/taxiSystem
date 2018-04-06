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
        this._ui.showSuccessNotification();
        var list = this._orders.getAllOrders();
        this._ui.showOrdersList(list);
    }

    selectMenuItemAllOrders() {
        var list = this._orders.getAllOrders();
        this._ui.showOrdersList(list);
    }

    selectOrder(id) {
        var info = this._orders.getOrder(id);
        this._ui.showOrderInfo(info);
    }

    selectEditOrder(id) {
        var info = this._orders.getOrder(id);
        this._ui.showOrderEditForm(info);
    }

    editOrder(orderParams) {
        this._orders.editOrder(orderParams);
        // this.ui.showSuccessNotification();
        var info = this._orders.getOrder(orderParams.id);
        this._ui.showOrderInfo(info);
    }
}