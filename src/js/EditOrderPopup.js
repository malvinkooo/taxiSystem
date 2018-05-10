class EditOrderPopup {
    constructor(editOrderPopupElement) {
        this._ordersController = null;
        this._lastOrder = null;
        this._editOrderPopupElement = editOrderPopupElement;
        this._carFeedPointSearchBox = new SearchBox(this._editOrderPopupElement.find(".search.carFeedPoint"));
        this._destinationSearchBox = new SearchBox(this._editOrderPopupElement.find(".search.destination"));
        this._statusListSelect = this._editOrderPopupElement.find("select.status-list");
        var statusList = OrderStatus.statusList;
        for (var i = 0; i < statusList.length; i++) {
            this._statusListSelect.append("<option value="
                +statusList[i]+">"
                +statusList[i]+
            "</option>");
        }
        this._driversListSelect = this._editOrderPopupElement.find("select.drivers-list");
        this._statusListSelect.dropdown({showOnFocus: false});
        this._editOrderPopupElement.find(".submit").click(this._onEditFormSubmit.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    showEditOrderForm(order) {
        this._lastOrder = order;
        var elements = this._editOrderPopupElement.find("[data-getattr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            $(elements[i]).val(order[getAttr]());
        }
        this._editOrderPopupElement.find("[data-getattr='getId']").html(order.getId());
        this._statusListSelect.dropdown('set selected', order.getStatus());

        this._driversListSelect.html("");
        var driversList = this._driversController.getDriversList();
        for(var j = 0; j < driversList.length; j++) {
            this._driversListSelect.append("<option value='"
                +driversList[j].getId()+"'>"
                +driversList[j].getFullName()+
            "</option>");
        }
        this._driversListSelect.dropdown('set selected', order.getDriver().getId());
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