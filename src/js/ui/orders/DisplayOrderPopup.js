class DisplayOrderPopup {
    constructor() {
        $($("#displayOrderPopup").html()).appendTo("body");
        this._displayOrderPopupElement = $(".displayOrderModal");
        this._ordersController = null;
        this._driversController = null;
        this._cleanHTML = true;
        this._order = null;
        this._displayOrderPopupElement.find(".edit-order").click(this._onEditOrderButtonClick.bind(this));
        this._displayOrderPopupElement.modal({
            onHidden: (function() {
                if(this._cleanHTML) {
                    $(".displayOrderModal").remove();
                }
            }).bind(this)
        });
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    _repaint() {
        var driver = this._order.getDriver();
        var statusColorsList = OrderStatus.colorsList;
        for (var j in statusColorsList) {
            this._displayOrderPopupElement
                .find(".order-status")
                .removeClass(statusColorsList[j]);
        }
        var elements = this._displayOrderPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            $(elements[i]).html(this._order[getAttr]()+'');
        }

        var driverElements = this._displayOrderPopupElement.find("[data-driver-getAttr]");
        for(var k = 0; k < driverElements.length; k++) {
            var driverGetAttr = $(driverElements[k]).attr("data-driver-getAttr");
            $(driverElements[k]).html( driver ? driver[driverGetAttr]() : '-' );
        }

        var clientElements = this._displayOrderPopupElement.find("[data-client-getAttr]");
        for(var k = 0; k < clientElements.length; k++) {
            var clientGetAttr = $(clientElements[k]).attr("data-client-getAttr");
            $(clientElements[k]).html(this._order.getClient()[clientGetAttr]());
        }

        this._displayOrderPopupElement.find("[data-car-getAttr]").html(
            driver && driver.getCar() ? this._order.getDriver().getCar().toString() : '-'
        );

        this._displayOrderPopupElement
            .find(".status")
            .addClass(statusColorsList[this._order.getStatus()]);
    }

    showOrder(order) {
        this._order = order;
        this._repaint();
        this._displayOrderPopupElement.modal("show");
    }

    _onEditOrderButtonClick() {
        var popup = new EditOrderPopup({
            onClosed: () => {
                this._repaint();
                this._displayOrderPopupElement.modal("show");
                this._cleanHTML = true;
            }
        });
        popup.setOrdersController(this._ordersController);
        popup.setDriversController(this._driversController);
        this._cleanHTML = false;
        popup.show(this._order);
    }
}