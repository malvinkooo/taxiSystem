class AddDriverForm{
    constructor(addDriverFormElement){
        this._addDriverFormElement = addDriverFormElement;
        this._driversController = null;
        this._carsController = null;
        this._selectDropDown = this._addDriverFormElement.find("select.cars-list");
        this._addDriverFormElement.find(".submit").click(this._onAddDriverFormSubmit.bind(this));
        this._addDriverFormConstraints = Validation.getAddDriverConstraints();
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