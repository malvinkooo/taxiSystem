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

    showEditOrderForm(info) {
        this._lastOrder = info;
        this._statusListSelectElement.dropdown('set selected',[info['status']]);
        for(var key in info) {
            this._editOrderPopupElement.find("." + key).val(info[key]);
        }
        this._editOrderPopupElement.find(".id").html(info['id']);
        this._editOrderPopupElement.find(".driver").html(info['driver']);
        this._editOrderPopupElement.modal("show");
    }

    _onEditFormSubmit() {
        var orderParams = {};
        var elements = this._editOrderPopupElement.find('input, select');
        for (var i = 0; i < elements.length; i++) {
            orderParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        orderParams['id'] = this._lastOrder.id;
        if(orderParams['status'] === OrderStatus.COMPLETED && orderParams['status'] !== this._lastOrder['status']){
            orderParams['dateOfCompletion'] = new Date();
        } else if(orderParams['status'] !== OrderStatus.COMPLETED) {
            orderParams['dateOfCompletion'] = '-';
        }
        this._ordersController.editOrder(orderParams);
    }
}