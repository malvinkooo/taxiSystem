class DisplayCarPopup {
    constructor(displayCarPopupElement) {
        this._displayCarPopupElement = displayCarPopupElement;
        this._lastCarId = null;
        this._displayCarPopupElement.find(".edit-car").click(this._onEditCarButtonClick.bind(this));
        this._displayCarPopupElement.modal({
            onHide: this._onDisplayCarPopupClose.bind(this)
        });
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    showCar(car) {
        this._lastCarId = car.getId();
        var elements = this._displayCarPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            var getAttr = element.attr("data-getAttr");
            element.html(car[getAttr]());
        }
        this._displayCarPopupElement.modal("show");
    }

    _onEditCarButtonClick() {
        this._carsController.selectEditCar(this._lastCarId);
    }

    _onDisplayCarPopupClose() {
        this._carsController.selectMenuItemAllCars();
    }
}