class DisplayOrderPopup {
    constructor() {
        $($("#displayOrderPopup").html()).appendTo("body");
        this._displayOrderPopupElement = $(".displayOrderModal");
        this._ordersController = null;
        this._displayOrderPopupElement.find(".edit-order").click(this._onEditOrderButtonClick.bind(this));
        this._displayOrderPopupElement.modal({
            onHidden: function() {
                $(".displayOrderModal").remove();
            }
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
            $(elements[i]).html(order[getAttr]()+'');
        }
        var driverElements = this._displayOrderPopupElement.find("[data-driver-getAttr]");
        for(var k = 0; k < driverElements.length; k++) {
            var driverGetAttr = $(driverElements[k]).attr("data-driver-getAttr");
            $(driverElements[k]).html(order.getDriver()[driverGetAttr]());
        }
        this._displayOrderPopupElement.find("[data-car-getAttr]").html(order.getDriver().getCar().toString());
        this._displayOrderPopupElement
            .find(".status")
            .addClass(statusColorsList[order.getStatus()]);
        this._displayOrderPopupElement.modal("show");
    }

    _onEditOrderButtonClick(e) {
        this._ordersController.selectEditOrder(this._lastOrderId);
    }
}