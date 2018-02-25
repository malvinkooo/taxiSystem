class OrdersController {
    constructor(ui, orders) {
        this._ui = ui;
        this._orders = orders;
    }
    
    selectMenuItemAddOrder() {
        this._ui.showAddOrderForm();
    }

    addOrder(orderParams) {
        this._orders.addOrder(orderParams);
        this._ui.showSuccessNotification();
        var list = this._orders.getAllOrders();
        this.ui.showOrdersList(list);
    }

    selectMenuItemAllOrders() {
        var list = this._orders.getAllOrders();
        this._ui.showOrdersList(list);
    }

    selectOrder(id) {
        var info = this._orders[id].getInfo();
        this._ui.showOrderInfo(info);
    }

    selectEditOrder(id) {
        var info = this._orders[id].getInfo();
        this._ui.showOrderEditForm(info);
    }

    editOrder(id, orderParams) {
        this._orders.editOrder(id, orderParams);
        this.ui.showSuccessNotification();
        var info = this._orders.getOrder(id);
        this.ui.showOrderInfo(info);
    }
}