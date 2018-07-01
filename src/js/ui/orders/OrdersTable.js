class OrdersTable {
    constructor(ordersTableElement, ordersList) {
        this._ordersTableElement = ordersTableElement;
        this._ordersList = ordersList;
        this._ordersController = null;
        this._editOrderPopup = new EditOrderPopup(this._ordersTableElement.find(".editOrderModal"));
        this._tbody = this._ordersTableElement.find('table tbody');

        this._ordersList.onOrderAdded(this._orderAdded.bind(this));
        this._ordersList.onOrderChanged(this._orderChanged.bind(this));

        this._tbody.on("click", "tr", this._onOrderRowClick.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
        this._editOrderPopup.setOrdersController(ordersController);
    }

    setDriversController(driversController) {
        this._editOrderPopup.setDriversController(driversController);
    }

    _showOrdersList() {
        var list = this._ordersList.getAllOrders();
        this._tbody.html('');
        var statusColorsList = OrderStatus.colorsList;
        for(var i=0; i < list.length; i++) {
            var order = list[i];
            $('<tr data-order-id='+ order.getId() +'><td>'+ order.getClientName() +
                '</td><td>' + order.getClientPhone() +
                '</td><td>' + order.getCarFeedPoint() +
                '</td><td>' + order.getDestination() +
                '</td><td>' + order.getDistance() +
                '</td><td>' + order.getRate() +
                '</td><td><button class="ui button order-status '+statusColorsList[order.getStatus()]+'">' + order.getStatus() +
                '</button></td><td>' + order.getDateOfCreation() +
                '</td><td>' + order.getDateOfCompletion() +
                '</td><td>' + order.getDriver().getFullName() +
                '</td></tr>').appendTo(this._tbody);
        }
    }

    showOrder(order) {
        var popup = new DisplayOrderPopup();
        popup.setOrdersController(ordersController);
        popup.showOrder(order);
    }

    showEditOrderform(order) {
        this._editOrderPopup.showEditOrderForm(order);
    }

    _onOrderRowClick(e) {
        var orderId = e.currentTarget.dataset.orderId;
        this._ordersController.selectOrder(orderId);
    }

    _orderAdded() {
        this._showOrdersList();
    }

    _orderChanged() {
        this._showOrdersList();
    }
}