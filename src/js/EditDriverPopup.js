class EditDriverPopup {
    constructor(editDriverPopupElement){
        this._editDriverPopupElement = editDriverPopupElement;
        this._carsController = null;
        this._driversController = null;
        this._lastDriverId = null;
        this._currentLocation = new SearchBox(this._editDriverPopupElement.find(".search.currentLocation"));
        this._statusListSelectElement = this._editDriverPopupElement.find("select.status-list");
        this._carsListSelectElement = this._editDriverPopupElement.find("select.cars-list");
        var statusList = DriverStatus.statusList;
        for (var i = 0; i < statusList.length; i++) {
            this._statusListSelectElement.append("<option value='"
                +statusList[i]+"'>"
                +statusList[i]+
            "</option>");
        }
        this._statusListSelectElement.dropdown({showOnFocus: false});
        this._editDriverPopupElement.find(".submit").click(this._onEditFormSubmit.bind(this));
        this._editDriverPopupConstraints = Validation.getEditDriverConstraints();
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    showEditDriverForm(driver) {
        this._lastDriverId = driver.getId();
        var elements = this._editDriverPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            $(elements[i]).val(driver[getAttr]());
        }
        this._editDriverPopupElement.find("[data-GetAttr='getId']").html(driver.getId());
        this._statusListSelectElement.dropdown('set selected', driver.getStatus());

        this._carsListSelectElement.html("");
        var carsList = this._carsController.getCarsList();
        for(var i = 0; i < carsList.length; i++) {
            var car = carsList[i];
            this._carsListSelectElement.append("<option value='"
            +car.getId()+"'>"
            +car.getBrand()+ " " + car.getStateCarNumber()
            +"</option>");
        }
        this._carsListSelectElement.dropdown("set selected", driver.getCar().getId());
        this._editDriverPopupElement.modal("show");
    }

    _onEditFormSubmit() {
        var driverParams = {};
        driverParams["id"] = this._lastDriverId;
        var elements = this._editDriverPopupElement.find("input, select, textarea");
        for (var i = 0; i < elements.length; i++) {
            driverParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        var errors = validate(driverParams, this._editDriverPopupConstraints);
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
            this._driversController.editDriver(driverParams);
            this._editDriverPopupElement.find("form")[0].reset();
        }
    }
}