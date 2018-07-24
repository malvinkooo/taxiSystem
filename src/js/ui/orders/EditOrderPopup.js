class EditOrderPopup {
    constructor(options) {
        if (options) {
            this._onAccept = options.onAccept || null;
            this._onReject = options.onReject || null;
            this._onClosed = options.onClosed || null;
        }
        $($("#editOrderPopup").html()).appendTo("body");
        this._ordersController = null;
        this._driversController = null;
        this._lastOrder = null;
        this._cleanHTML = true;
        this._editOrderPopupElement = $(".editOrderModal");
        this._editOrderPopupElement.modal({
            onHidden: () => {
                if(this._cleanHTML) {
                    this._onClosed();
                    $(".editOrderModal").remove();
                }
            }
        });
        this._carFeedPointSearchBox = new SearchBox(this._editOrderPopupElement.find(".search.carFeedPoint"));
        this._carFeedPointSearchBox.onSelect((address) => {
            this._editOrderPopupElement.find("input[name='carFeedPoint']").value(address);
        });
        this._destinationSearchBox = new SearchBox(this._editOrderPopupElement.find(".search.destination"));
        this._destinationSearchBox.onSelect((address) => {
            this._editOrderPopupElement.find("input[name='destination']").value(address);
        });
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
        this._editOrderFormConstraints = Validation.getOrderConstraints();

        this._editOrderPopupElement
            .find(".carFeedPoint .map.marker")
            .click(this._onShowMapClick.bind(
                this,
                this._editOrderPopupElement.find("input[name='carFeedPoint']"),
                this._editOrderPopupElement.find(".carFeedPoint input.lat"),
                this._editOrderPopupElement.find(".carFeedPoint input.lng")
            )
        );
        this._editOrderPopupElement
            .find(".destination .map.marker")
            .click(this._onShowMapClick.bind(
                this,
                this._editOrderPopupElement.find("input[name='destination']"),
                this._editOrderPopupElement.find(".destination input.lat"),
                this._editOrderPopupElement.find(".destination input.lng")
            )
        );
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    show(order) {
        this._lastOrder = order;
        var elements = this._editOrderPopupElement.find("[data-getattr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            $(elements[i]).value(order[getAttr]());
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
            orderParams[$(elements[i]).attr('name')] = $(elements[i]).value();
        }
        orderParams['id'] = this._lastOrder.getId();
        if(orderParams['status'] === OrderStatus.COMPLETED && orderParams['status'] !== this._lastOrder.getStatus()){
            orderParams['dateOfCompletion'] = new Date();
        } else if(orderParams['status'] !== OrderStatus.COMPLETED) {
            orderParams['dateOfCompletion'] = '-';
        }
        var errors = validate(orderParams, this._editOrderFormConstraints);
        for( var k = 0; k < elements.length; k++) {
            var field = $(elements[k]).closest(".field");
            field.removeClass("has-error");
            field.find(".help-error").remove();
            if(errors) {
                var errorsInput = errors[$(elements[k]).attr("name")];
                if(errorsInput) {
                    field.addClass("has-error").append("<p class='help-error'>"+errorsInput+"</p>");
                }
            }
        }
        if(!errors) {
            this._ordersController.editOrder(orderParams);
            this._editOrderPopupElement.find("form")[0].reset();
        }
    }

    _onShowMapClick(inputAddress, inputLat, inputLng) {
        this._cleanHTML = false;
        var mapPopup = new MapPopup({
            onAccept: (selectedAddress) => {
                inputAddress.value(selectedAddress);
            },
            onClosed: () => {
                this._cleanHTML = true;
                this._editOrderPopupElement.modal("show");
            }
        });
        mapPopup.show(inputAddress.value());
    }
}