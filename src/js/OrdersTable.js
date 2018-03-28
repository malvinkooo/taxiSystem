class OrdersTable {
    constructor(ordersTableElement) {
        this._ordersTableElement = ordersTableElement;
        this._ordersController = null;
        this._orderPoup = new OrderPopup($(".orderModal"));
        this._tbody = this._ordersTableElement.find('table tbody');
        this._tbody.on("click", "tr", this._onOrderRowClick.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
        this._orderPoup.setOrdersController(ordersController);
    }

    showOrdersList(list) {
        this._tbody.html('');
        for(var i=0; i < list.length; i++) {
            var row = list[i];
            $('<tr data-order-id='+ row.id +'><td>'+ row.clientName +
                '</td><td>' + row.clientPhone +
                '</td><td>' + row.carFeedPoint +
                '</td><td>' + row.destination +
                '</td><td>' + row.distance +
                '</td><td>' + row.rate +
                '</td><td>' + row.status +
                '</td><td>' + row.dateOfCreation +
                '</td><td>' + row.dateOfCompletion +
                '</td><td>' + row.driver +
                '</td></tr>').appendTo(this._tbody);
        }
    }

    showOrderInfo(info) {
        this._orderPoup.showOrderInfo(info);
    }

    _onOrderRowClick(e) {
        var orderId = e.currentTarget.dataset.orderId;
        this._ordersController.selectOrder(orderId);
    }
}