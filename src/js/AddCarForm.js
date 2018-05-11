class AddCarForm {
    constructor(addCarFormElement) {
        this._addCarFormElement = addCarFormElement;
        this._addCarFormElement.find(".submit").click(this._onAddCarFormSubmit.bind(this));
        this._addCarFormConstraints = {
            stateCarNumber: {
                presence: {
                    message: "^Пожалуйста, заполните поле."
                },
                length: {
                    minimum: 5,
                    maximum: 15,
                    message: "^Номер автомобиля должен состоять максимум из 15 символов и минимум из 5."
                }
            },
            brand: {
                presence: {
                    message: "^Пожалуйста, заполните поле."
                },
                length: {
                    minimum: 3,
                    maximum: 50,
                    message: "^Марка автомобиля должна состоять максимум из 50 символов и минимум из 4."
                }
            },
            gasolineConsumptionRatio: {
                presence: {
                    message: "^Пожалуйста, заполните поле."
                },
                numericality: {
                    greaterThanOrEqualTo: 0,
                    message: "^Допустимы только положительные числа."
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

    _onAddCarFormSubmit() {
        var carsParams = {};
        var elements = this._addCarFormElement.find("input, textarea");
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            carsParams[element.attr("name")] = element.val();
        }

        var form = this._addCarFormElement.find("form")[0];
        var errors = validate(carsParams, this._addCarFormConstraints);

        for(var k = 0; k < elements.length; k++){
            var field = $(elements[k]).closest(".field");
            field.removeClass("has-error");
            field.find(".help-error").remove();
            if(errors){
                var errorsInput = errors[$(elements[k]).attr("name")];
                if(errorsInput){
                    field.addClass("has-error").append("<p class='help-error'>"+errorsInput+"</p>");
                }
            }
        }
        if(!errors) {
            this._carsController.addCar(carsParams);
            this._addCarFormElement.find("form")[0].reset();
        }
    }
}