class AddCarForm {
    constructor(addCarFormElement) {
        this._addCarFormElement = addCarFormElement;
        this._addCarFormElement.find(".submit").click(this._onAddCarFormSubmit.bind(this));
        this._addCarFormConstraints = Validation.getCarConstraints();

        this._successMessage = this._addCarFormElement.find(".success.message");
        this._successMessage.find(".close").click(() => this._successMessage.slideUp(600));
        this._errorMessage = this._addCarFormElement.find(".error.message");
        this._errorMessage.find(".close").click(() => this._errorMessage.slideUp(600));
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
            this._carsController.addCar(carsParams)
                .then(() => {
                    this._addCarFormElement.find("form")[0].reset();
                    this._successMessage.slideDown(800);
                }).catch(error => {
                    console.log(error.code);
                    console.log(error.message);
                    this._errorMessage.slideDown(800);
                });
        }
    }
}