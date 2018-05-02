class EditCarPopup {
    constructor(editCarPopupElement) {
        this._editCarPopupElement = editCarPopupElement;
        this._lastCarId = null;
        this._editCarPopupElement.find(".submit").click(this._onEditFormSubmit.bind(this));
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    showEditCarForm(car) {
        this._lastCarId = car.getId();
        var elements = this._editCarPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            var getAttr = element.attr("data-getAttr");
            element.val(car[getAttr]());
        }
        this._editCarPopupElement.find("[data-getAttr='getId']").html(car.getId());
        this._editCarPopupElement.modal("show");

    }

    _onEditFormSubmit() {
        var carParams = {};
        carParams["id"] = this._lastCarId;
        var elements = this._editCarPopupElement.find("input, textarea");
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            carParams[element.attr("name")] = element.val();
        }
        this._carsController.editCar(carParams);
    }
}