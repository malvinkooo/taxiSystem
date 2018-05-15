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
        this._editDriverPopupConstraints = {
            name: {
                format: {
                    pattern: /[А-Яа-я-ёЁ]+/,
                    message: "^Пожалуйста, заполните это поле. Имя может состоять только из букв."
                },
                length: {
                    minimum: 2,
                    maximum: 30,
                    message: "^Имя должно состоять максимум из 30 символов и минимум из 2."
                }
            },
            surname: {
                format: {
                    pattern: /[А-Яа-я-ёЁ]+/,
                    message: "^Пожалуйста, заполните это поле. Фамилия может состоять только из букв."
                },
                length: {
                    minimum: 2,
                    maximum: 30,
                    message: "^Фамилия должна состоять максимум из 30 символов и минимум из 2."
                }
            },
            phone: {
                format: {
                    pattern: /^\+?(\d+(\#\d+)?){1,30}/,
                    message: "^Это поле обязательно для заполнения. Номер телефона не может превышать 30 символов и должен состоять только из цифр."
                }
            },
            currentLocation: {
                length: {
                    maximum: 50,
                    message: "^Адрес может состоять максимум из 50 символов"
                }
            },
            description: {
                length: {
                    maximum: 255,
                    message: "^Количество символов не должно быть больше 255."
                }
            }
        };
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
                    console.log(errorsInput);
                    console.log(field);
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