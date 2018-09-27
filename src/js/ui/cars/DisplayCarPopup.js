class DisplayCarPopup {
    constructor(carsList) {
        $($("#displayCarPopup").html()).appendTo("body");
        this._displayCarPopupElement = $(".displayCarModal");
        this._car = null;
        this._carsList = carsList;
        this._carsController = null;
        this._cleanHTML = true;
        this._carsList.onCarChanged(car => {
            this._car = car;
            this._repaint();
        });
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
        if(this._car.isDeleted()) {
            this._displayCarPopupElement.find(".status").show();
            this._displayCarPopupElement.find(".edit-car").addClass("disabled");
            this._displayCarPopupElement.find(".delete-car").addClass("disabled");
        }
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
        this._displayCarPopupElement.modal("show");
    }

    _destroy() {
        if(this._cleanHTML) {
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
        var questionBox = new QuestionMessageBox({
            onAccept: (function(){
                this._carsController.selectDeleteCar(this._car)
                    .then(() => {
                        this._cleanHTML = true;
                        this._destroy();
                    }).catch((error) => {
                        console.log(error.code);
                        console.log(error.message);
                        var infoMessage = new InfoMessageBox({
                            onHidden: () => {
                                this._displayCarPopupElement.modal("show");
                                this._cleanHTML = true;
                            },
                            messageText: "Машина не была удалена. Попробуйте снова через некоторое время."
                        });
                        infoMessage.show();
                    });
            }).bind(this),
            onReject: (function(){
                this._displayCarPopupElement.modal("show");
                this._cleanHTML = true;
            }).bind(this),
            messageText: "Вы действительно хотите удалить машину?"
        });
        questionBox.show();
    }
}