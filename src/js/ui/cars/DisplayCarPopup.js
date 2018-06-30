class DisplayCarPopup {
    constructor(displayCarPopupElement) {
        this._displayCarPopupElement = displayCarPopupElement;
        this._lastCarId = null;
        this._displayCarPopupElement.find(".edit-car").click(this._onEditCarButtonClick.bind(this));
        this._displayCarPopupElement.find(".delete-car").click(this._onDeleteCarButtonClick.bind(this));
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

    _onDeleteCarButtonClick() {
        var questionBox = new QuestionMessageBox("Вы действительно хотите удалить машину?");
        questionBox.show((function(){
            this._carsController.selectDeleteCar(this._lastCarId);
        }).bind(this), (function(){
            this._carsController.selectCar(this._lastCarId);
        }).bind(this));
    }
}