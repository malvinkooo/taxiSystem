class DisplayOrderPopup {
    constructor(displayOrderPopupElement) {
        this._displayOrderPopupElement = displayOrderPopupElement;
        this._ordersController = null;
        this._displayOrderPopupElement.find(".edit-order").click(this._onEditOrderButtonClick.bind(this));
        this._displayOrderPopupElement.modal({
            onHide: this._onDisplayOrderPopupClose.bind(this)
        });
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    showOrderInfo(info) {
        var statusColorsList = OrderStatus.colorsList;
        for (var j in statusColorsList) {
            this._displayOrderPopupElement
                .find(".order-status")
                .removeClass(statusColorsList[j]);
        }
        for (var key in info) {
        	this._displayOrderPopupElement.find(".order-"+key+"").html(info[key]);
        }
        this._displayOrderPopupElement
        	.modal("show")
        	.find(".edit-order")
        	.attr("data-order-id", info.id);
        this._displayOrderPopupElement
            .find(".order-status")
            .addClass(statusColorsList[info.status]);
    }

    _onEditOrderButtonClick(e){
    	var orderId = e.currentTarget.dataset.orderId;
    	this._ordersController.selectEditOrder(orderId);
    }

    _onDisplayOrderPopupClose() {
        this._ordersController.selectMenuItemAllOrders();
    }
}