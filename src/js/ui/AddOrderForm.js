class AddOrderForm {
    constructor(addOrderFormElement) {
        this._addOrderFormElement = addOrderFormElement;
        this._selectDropDown = this._addOrderFormElement.find('select.drivers-list');
        this._addOrderFormElement.find('.ui.checkbox').checkbox({
            onChecked: this._onSetDriverAutomaticallyChecked.bind(this),
            onUnchecked: this._onSetDriverAutomaticallyUnchecked.bind(this)
        });
        this._carFeedPointSearchBox = new SearchBox(this._addOrderFormElement.find(".search.carFeedPoint"));
        this._destinationSearchBox = new SearchBox(this._addOrderFormElement.find(".search.destination"));
        this._isSetDriverAutomaticallyChecked = false;
        this._addOrderFormElement.find('.submit').click(this._onAddOrderFormSubmit.bind(this));
        this._addOrderFormConstraints = Validation.getOrderConstraints();
        this._map = new MapPopup($(".map.modal"));
        this._addOrderFormElement
            .find(".carFeedPoint .map.marker")
            .click(this._onShowMapClick.bind(
                this,
                this._addOrderFormElement.find("input[name='carFeedPoint']"),
                this._addOrderFormElement.find(".carFeedPoint input.lat"),
                this._addOrderFormElement.find(".carFeedPoint input.lng")
            )
        );
        this._addOrderFormElement
            .find(".destination .map.marker")
            .click(this._onShowMapClick.bind(
                this,
                this._addOrderFormElement.find("input[name='destination']"),
                this._addOrderFormElement.find(".destination input.lat"),
                this._addOrderFormElement.find(".destination input.lng")
            )
        );
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    _onAddOrderFormSubmit() {
        var orderParams = {};
        var elements = this._addOrderFormElement.find('input.param, select[name]');
        for(var i=0; i < elements.length; i++) {
            orderParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        orderParams.isSetDriverAutomatically = this._isSetDriverAutomaticallyChecked;
        var errors = validate(orderParams, this._addOrderFormConstraints);
        for(var k = 0; k < elements.length; k++) {
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
            this._ordersController.addOrder(orderParams);
            this._addOrderFormElement.find('form')[0].reset();
        }
    }

    show() {
        this._selectDropDown.html("");
        var driversList = this._driversController.getDriversList();
        for(var i = 0; i < driversList.length; i++) {
            var driver = driversList[i];
            this._selectDropDown.append("<option value='"
                +driver.getId()+"'>"
                +driver.getFullName()
            +"</option>");
        }
        this._selectDropDown.dropdown();
    }

    _onSetDriverAutomaticallyChecked() {
        this._isSetDriverAutomaticallyChecked = true;
        this._selectDropDown.closest(".selection").addClass("disabled");
    }

    _onSetDriverAutomaticallyUnchecked() {
        this._isSetDriverAutomaticallyChecked = false;
        this._selectDropDown.closest(".selection").removeClass("disabled");
    }

    _onShowMapClick(inputAddress, inputLat, inputLng) {
        this._map.show(function(address){
            inputAddress.val(address.address);
            inputLat.val(address.lat);
            inputLng.val(address.lng);
        });
    }
}