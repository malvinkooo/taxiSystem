class AddDriverForm{
    constructor(addDriverFormElement, carsList){
        this._addDriverFormElement = addDriverFormElement;
        this._driversController = null;
        this._carsController = null;
        this._carsList = carsList;
        this._selectDropDown = this._addDriverFormElement.find("select.cars-list");
        this._addDriverFormElement.find(".submit").click(this._onAddDriverFormSubmit.bind(this));
        this._addDriverFormConstraints = Validation.getAddDriverConstraints();

        this._successMessage = this._addDriverFormElement.find(".success.message");
        this._successMessage.find(".close").click(() => this._successMessage.slideUp(600));
        this._errorMessage = this._addDriverFormElement.find(".error.message");
        this._errorMessage.find(".close").click(() => this._errorMessage.slideUp(600));
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    show() {
        this._selectDropDown.html("");

        this._carsList.getFreeCars()
            .then(carsList => {
                this._selectDropDown.append("<option value='0'>-Не назначать машину</option>");
                for(var i = 0; i < carsList.length; i++){
                    var car = carsList[i];
                    this._selectDropDown.append("<option value='"
                        +car.getId()+"'>"+car+"</option>");
                }
                this._selectDropDown.dropdown();
            })
            .catch(error => {
                console.log(error.code);
                console.log(error.message);
            });
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
            driverParams.status = "Свободен";
            this._driversController.addDriver(driverParams)
                .then(() => {
                    this._addDriverFormElement.find("form")[0].reset();
                    this._successMessage.slideDown(600);
                }).catch(error => {
                    console.log(error.code);
                    console.log(error.message);
                    this._errorMessage.slideDown(600);
                });
        }
    }
}