class OrdersTable {
    constructor(ordersTableElement) {
        this._ordersTableElement = ordersTableElement;
        this._ordersController = null;
        this._displayOrderPoup = new DisplayOrderPopup(this._ordersTableElement.find(".displayOrderModal"));
        this._editOrderPopup = new EditOrderPopup(this._ordersTableElement.find(".editOrderModal"));
        this._tbody = this._ordersTableElement.find('table tbody');
        this._tbody.on("click", "tr", this._onOrderRowClick.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
        this._displayOrderPoup.setOrdersController(ordersController);
        this._editOrderPopup.setOrdersController(ordersController);
    }

    showOrdersList(list) {
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
        this._displayOrderPoup.showOrder(order);
    }

    showEditOrderform(order) {
        this._editOrderPopup.showEditOrderForm(order);
    }

    _onOrderRowClick(e) {
        var orderId = e.currentTarget.dataset.orderId;
        this._ordersController.selectOrder(orderId);
    }
}