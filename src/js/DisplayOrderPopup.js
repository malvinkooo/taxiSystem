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

    showOrderInfo(info) {
        this._lastOrderId = info.id;
        var statusColorsList = OrderStatus.colorsList;
        for (var j in statusColorsList) {
            this._displayOrderPopupElement
                .find(".order-status")
                .removeClass(statusColorsList[j]);
        }
        for (var key in info) {
        	this._displayOrderPopupElement.find("."+key+"").html(info[key]);
        }
        this._displayOrderPopupElement.modal("show");
        this._displayOrderPopupElement
            .find(".status")
            .addClass(statusColorsList[info.status]);
    }

    _onEditOrderButtonClick(e){
    	this._ordersController.selectEditOrder(this._lastOrderId);
    }

    _onDisplayOrderPopupClose() {
        this._ordersController.selectMenuItemAllOrders();
    }
}