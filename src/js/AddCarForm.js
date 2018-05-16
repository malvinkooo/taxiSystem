class AddCarForm {
    constructor(addCarFormElement) {
        this._addCarFormElement = addCarFormElement;
        this._addCarFormElement.find(".submit").click(this._onAddCarFormSubmit.bind(this));
        this._addCarFormConstraints = Validation.getCarConstraints();
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
            this._carsController.addCar(carsParams);
            this._addCarFormElement.find("form")[0].reset();
        }
    }
}