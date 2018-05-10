class AddCarForm {
    constructor(addCarFormElement) {
        this._addCarFormElement = addCarFormElement;
        this._addCarFormElement.find(".submit").click(this._onAddCarFormSubmit.bind(this));
        this._addCarFormConstraints = {
            stateCarNumber: {
                presence: {
                    message: "^Пожалуйста, заполните поле 'Гос. номер'"
                },
                length: {
                    minimum: 5,
                    maximun: 15,
                    message: "^Номер автомобиля должен состоять максимум из 15 символов и минимум из 5"
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
        var errors = validate(form, this._addCarFormConstraints);
        console.log(errors);
        // this._carsController.addCar(carsParams);
        // this._addCarFormElement.find("form")[0].reset();
    }
}