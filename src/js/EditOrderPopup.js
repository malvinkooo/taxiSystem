class EditOrderPopup {
    constructor(editOrderPopupElement) {
        this._ordersController = null;
        this._editOrderPopupElement = editOrderPopupElement;
        this._statusListSelectElement = this._editOrderPopupElement.find("select.status-list");
        this._statusListSelectElement.dropdown();
        this._editOrderPopupElement.find(".submit").click(this._onEditFormSubmit.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    showEditOrderForm(info) {
        var statusColorsList = OrderStatus.colorsList;
        var statusList = OrderStatus.statusList;
        var statusListCustomElement = this._editOrderPopupElement
            .find(".status-list .menu")
        statusListCustomElement.html("");
        this._statusListSelectElement.html("");
        for (var j in statusColorsList) {
            this._editOrderPopupElement
                .find(".order-status")
                .removeClass(statusColorsList[j]);
        }
        for (var i = 0; i < statusList.length; i++) {
            statusListCustomElement.append("<div class='item' data-value="
                +statusList[i]+">"
                +statusList[i]+
            "</div>");
            this._statusListSelectElement.append("<option value="
                +statusList[i]+">"
                +statusList[i]+
            "</option>");
        }
        this._statusListSelectElement.dropdown('set selected',[info['status']]);
        for(var key in info) {
            this._editOrderPopupElement.find(".order-"+key+"").val(info[key]);
        }
        this._editOrderPopupElement.find(".order-id").html(info['id']);
        this._editOrderPopupElement.find(".order-status")
            .addClass(statusColorsList[info['status']]).html(info['status']);
        this._editOrderPopupElement.find(".order-driver").html(info['driver']);
        this._editOrderPopupElement
            .modal("show")
            .find(".submit")
            .attr("data-order-id", info.id);
    }

    _onEditFormSubmit() {
        var orderParams = {};
        orderParams['status'] = this._statusListSelectElement.dropdown('get value');
        orderParams['id'] = this._editOrderPopupElement
                                    .find('[data-order-id]').attr("data-order-id");
        orderParams['clientName'] = this._editOrderPopupElement
                                    .find('.order-clientName').val();
        orderParams['clientPhone'] = this._editOrderPopupElement
                                    .find('.order-clientPhone').val();
        orderParams['carFeedPoint'] = this._editOrderPopupElement
                                    .find('.order-carFeedPoint').val();
        orderParams['destination'] = this._editOrderPopupElement
                                    .find('.order-destination').val();
        orderParams['rate'] = this._editOrderPopupElement
                                    .find('.order-rate').val();
        this._ordersController.editOrder(orderParams);

    }
}