class OrdersTab {
    constructor(ordersTabElement) {
        this._ordersTabElement = ordersTabElement;
        this._ordersTabElement.find('.secondary.menu .item').tab({
            onVisible: this._onAddOrderTabLoaded.bind(this)
        });
        this._addOrderForm = new AddOrderForm(this._ordersTabElement.find('.tab[data-tab="addOrder"]'));
        this._ordersTable = new OrdersTable(this._ordersTabElement.find('.tab[data-tab="allOrders"]'));
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

    setDriversController(driversController) {
        this._ordersTable.setDriversController(driversController);
        this._addOrderForm.setDriversController(driversController);
    }

    showOrder(order) {
        this._ordersTable.showOrder(order);
    }

    showEditOrderForm(order) {
        this._ordersTable.showEditOrderform(order);
    }

    _onAddOrderTabLoaded(tab){
        if(tab === 'addOrder') {
            this._addOrderForm.show();
        }
    }
}