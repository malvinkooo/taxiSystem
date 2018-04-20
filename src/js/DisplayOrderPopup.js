class DisplayOrderPopup {
    constructor(displayOrderPopupElement) {
        this._displayOrderPopupElement = displayOrderPopupElement;
        this._ordersController = null;
        this._displayOrderPopupElement.find(".edit-order").click(this._onEditOrderButtonClick.bind(this));
        this._displayOrderPopupElement.modal({
            onHide: this._onDisplayOrderPopupClose.bind(this)
        });
        this._lastOrderId = null;
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    showOrder(order) {
        this._lastOrderId = order.getId();
        var statusColorsList = OrderStatus.colorsList;
        for (var j in statusColorsList) {
            this._displayOrderPopupElement
                .find(".order-status")
                .removeClass(statusColorsList[j]);
        }
        this._displayOrderPopupElement.find(".status").html(order.getStatus());
        this._displayOrderPopupElement.find(".id").html(order.getId());
        this._displayOrderPopupElement.find(".carFeedPoint").html(order.getCarFeedPoint());
        this._displayOrderPopupElement.find(".clientName").html(order.getClientName());
        this._displayOrderPopupElement.find(".clientPhone").html(order.getClientPhone());
        this._displayOrderPopupElement.find(".dateOfCreation").html(order.getDateOfCreation());
        this._displayOrderPopupElement.find(".dateOfCompletion").html(order.getDateOfCompletion());
        this._displayOrderPopupElement.find(".destination").html(order.getDestination());
        this._displayOrderPopupElement.find(".distance").html(order.getDistance());
        this._displayOrderPopupElement.find(".rate").html(order.getRate());
        this._displayOrderPopupElement.modal("show");
        this._displayOrderPopupElement
            .find(".status")
            .addClass(statusColorsList[order.getStatus()]);
    }

    _onEditOrderButtonClick(e){
    	this._ordersController.selectEditOrder(this._lastOrderId);
    }

    _onDisplayOrderPopupClose() {
        this._ordersController.selectMenuItemAllOrders();
    }
}