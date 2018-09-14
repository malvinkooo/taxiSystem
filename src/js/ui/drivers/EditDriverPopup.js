class EditDriverPopup {
    constructor(options){
        if (options) {
            this._onAccept = options.onAccept || null;
            this._onReject = options.onReject || null;
            this._onClosed = options.onClosed || null;
        }

        $($("#editDriverPopup").html()).appendTo("body");
        this._editDriverPopupElement = $(".editDriverModal");
        this._carsController = null;
        this._driversController = null;
        this._lastDriverId = null;
        this._cleanHtml = true;
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
        this._editDriverPopupElement.modal({
            onApprove: () => {
                return this._onEditFormSubmit();
            },
            onHide: () => {
                this._cleanHTML = true;
            },
            onHidden: () => {
                if(this._cleanHTML) {
                    this._onClosed();
                    $(".editDriverModal").remove();
                }
            }
        });
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    show(driver) {
        this._lastDriverId = driver.getId();
        var elements = this._editDriverPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            $(elements[i]).val(driver[getAttr]());
        }
        this._editDriverPopupElement.find("[data-GetAttr='getId']").html(driver.getId());
        this._statusListSelectElement.dropdown('set selected', driver.getStatus());

        this._carsListSelectElement.html("");
        this._carsController.getFreeCarsList()
            .then(carsList => {
                this._carsListSelectElement.append("<option value='0'>-Не назначать машину</option>");
                for(var i = 0; i < carsList.length; i++) {
                    var car = carsList[i];
                    this._carsListSelectElement.append("<option value='"
                        +car.getId()+"'>"
                        +car.getBrand()+ " " + car.getStateCarNumber()
                        +"</option>");
                }

                this._carsListSelectElement.dropdown("set selected", driver.getCar().getId());
            })
            .catch(error => {
                console.log(error.code);
                console.log(error.message);
            });

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
            this._driversController.editDriver(driverParams)
                .then(() => {
                    this._editDriverPopupElement.find("form")[0].reset();
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.code);
                    console.log(error.message);
                });
            this._cleanHTML = true;
        } else {
            return false;
        }
    }
}