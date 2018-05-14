class AddDriverForm{
    constructor(addDriverFormElement){
        this._addDriverFormElement = addDriverFormElement;
        this._driversController = null;
        this._carsController = null;
        this._selectDropDown = this._addDriverFormElement.find("select.cars-list");
        this._addDriverFormElement.find(".submit").click(this._onAddDriverFormSubmit.bind(this));
        this._addDriverFormConstraints = {
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
            description: {
                length: {
                    maximum: 255,
                    message: "^Количество символов не должно быть больше 255."
                }
            }
        };
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    show() {
        this._selectDropDown.html("");
        var carsList = this._carsController.getCarsList();
        for(var i = 0; i < carsList.length; i++){
            var car = carsList[i];
            this._selectDropDown.append("<option value='"
                +car.getId()+"'>"+car+"</option>");
        }
        this._selectDropDown.dropdown();
    }

    _onAddDriverFormSubmit() {
        var driverParams = {};
        var elements = this._addDriverFormElement.find('input[name], textarea[name], select[name]');
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            driverParams[element.attr('name')] = element.val();
        }
        var errors = validate(driverParams, this._addDriverFormConstraints);
        for(var k = 0; k < elements.length; k++) {
            var field = $(elements[k]).closest(".field");
            console.log(field);
            field.removeClass("has-error");
            field.find(".help-error").remove();
            if(errors) {
                var errorsInput = errors[$(elements[k]).attr("name")];
                if(errorsInput) {
                    field.addClass("has-error").append("<p class='help-error'>"+errorsInput+"<p>");
                }
            }
        }
        if(!errors) {
            this._driversController.addDriver(driverParams);
            this._addDriverFormElement.find("form")[0].reset();
        }
    }
}