class AddCarForm {
    constructor(addCarFormElement) {
        this._addCarFormElement = addCarFormElement;
        this._addCarFormElement.find(".submit").click(this._onAddCarFormSubmit.bind(this));
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
        this._carsController.addCar(carsParams);
        this._addCarFormElement.find("form")[0].reset();
    }
}