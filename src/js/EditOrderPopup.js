class EditOrderPopup {
    constructor(editOrderPopupElement) {
        this._ordersController = null;
        this._lastOrder = null;
        this._editOrderPopupElement = editOrderPopupElement;
        this._statusListSelectElement = this._editOrderPopupElement.find("select.status-list");
        var statusList = OrderStatus.statusList;
        for (var i = 0; i < statusList.length; i++) {
            this._statusListSelectElement.append("<option value="
                +statusList[i]+">"
                +statusList[i]+
            "</option>");
        }
        this._statusListSelectElement.dropdown({showOnFocus: false});
        this._editOrderPopupElement.find(".submit").click(this._onEditFormSubmit.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    showEditOrderForm(order) {
        console.log(order);
        this._lastOrder = order;
        this._statusListSelectElement.dropdown('set selected', order.getStatus());
        this._editOrderPopupElement.find(".clientName").val(order.getClientName());
        this._editOrderPopupElement.find(".clientPhone").val(order.getClientPhone());
        this._editOrderPopupElement.find(".carFeedPoint").val(order.getCarFeedPoint());
        this._editOrderPopupElement.find(".destination").val(order.getDestination());
        this._editOrderPopupElement.find(".rate").val(order.getRate());
        this._editOrderPopupElement.find(".id").html(order.getId());
        this._editOrderPopupElement.find(".driver").html(order.driver);
        this._editOrderPopupElement.modal("show");
    }

    _onEditFormSubmit() {
        var orderParams = {};
        var elements = this._editOrderPopupElement.find('input, select');
        for (var i = 0; i < elements.length; i++) {
            orderParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        orderParams['id'] = this._lastOrder.getId();
        if(orderParams['status'] === OrderStatus.COMPLETED && orderParams['status'] !== this._lastOrder.getStatus()){
            orderParams['dateOfCompletion'] = new Date();
        } else if(orderParams['status'] !== OrderStatus.COMPLETED) {
            orderParams['dateOfCompletion'] = '-';
        }
        this._ordersController.editOrder(orderParams);
    }
}