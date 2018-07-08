class DisplayCarPopup {
    constructor() {
        $($("#displayCarPopup").html()).appendTo("body");
        this._displayCarPopupElement = $(".displayCarModal");
        this._car = null;
        this._carsController = null;
        this._lastCarId = null;
        this._cleanHTML = true;
        this._onCarChangeUnsubscribe = null;
        this._displayCarPopupElement.find(".edit-car").click(this._onEditCarButtonClick.bind(this));
        this._displayCarPopupElement.find(".delete-car").click(this._onDeleteCarButtonClick.bind(this));
        this._displayCarPopupElement.modal({
            onHidden: this._destroy.bind(this)
        });
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    _repaint() {
        this._lastCarId = this._car.getId();
        var elements = this._displayCarPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            var getAttr = element.attr("data-getAttr");
            element.html(this._car[getAttr]());
        }
    }

    showCar(car) {
        this._car = car;
        this._repaint();
        this._onCarChangeUnsubscribe = this._car.onChange(this._repaint.bind(this));
        this._displayCarPopupElement.modal("show");
    }

    _destroy() {
        if(this._cleanHTML) {
            this._onCarChangeUnsubscribe();
            $(".displayCarModal").remove();
        }
    }

    _onEditCarButtonClick() {
        var popup = new EditCarPopup({
            onClosed: () => {
                this._displayCarPopupElement.modal("show");
                this._cleanHTML = true;
            }
        });
        popup.setCarsController(this._carsController);
        this._cleanHTML = false;
        popup.show(this._car);
    }

    _onDeleteCarButtonClick() {
        this._cleanHTML = false;
        var questionBox = new QuestionMessageBox("Вы действительно хотите удалить машину?");
        questionBox.show((function(){
            this._cleanHTML = true;
            this._destroy();
            this._carsController.selectDeleteCar(this._car);
        }).bind(this), (function(){
            this._displayCarPopupElement.modal("show");
            this._cleanHTML = true;
        }).bind(this));
    }
}