class DisplayOrderPopup {
    constructor(displayOrderPopupElement) {
        this._displayOrderPopupElement = displayOrderPopupElement;
        this._displayOrderPopupElement.find(".edit-order").click(this._onEditOrderButtonClick.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    showOrderInfo(info) {
        for (var key in info) {
        	this._displayOrderPopupElement.find(".order-"+key+"").html(info[key]);
        }
        this._displayOrderPopupElement
        	.modal("show")
        	.find(".edit-order")
        	.attr("data-order-id", info.id);
    }

    _onEditOrderButtonClick(e){
    	var orderId = e.currentTarget.dataset.orderId;
    	this._ordersController.selectEditOrder(orderId);
    }
}