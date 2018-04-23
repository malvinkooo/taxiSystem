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
        var elements = this._displayOrderPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            this._displayOrderPopupElement
                .find("[data-getAttr="+getAttr+"]")
                .html(order[getAttr]());
        }
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