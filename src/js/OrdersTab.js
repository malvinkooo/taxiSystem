class OrdersTab {
    constructor(ordersTabElement) {
        this._ordersTabElement = ordersTabElement;
        this._ordersTabElement.find('.secondary.menu .item').tab();
        this._addOrderForm = new AddOrderForm(this._ordersTabElement.find('[data-tab="addOrder"]'));
        this._ordersTable = new OrdersTable(this._ordersTabElement.find('[data-tab="allOrders"]'));
    }

    showOrdersList(list) {
        $.tab('change tab', 'allOrders');
        this._ordersTabElement.find('[data-tab="allOrders"]').trigger('click');
        this._ordersTable.showOrdersList(list);
    }

    setOrdersController(ordersController) {
        this._addOrderForm.setOrdersController(ordersController);
        this._ordersTable.setOrdersController(ordersController);
    }

    showOrderInfo(info) {
        this._ordersTable.showOrderInfo(info);
    }
}