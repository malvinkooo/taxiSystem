class DisplayDriverPopup {
    constructor(driversList) {
        $($("#displayDriverPopup").html()).appendTo("body");
        this._displayDriverPopupElement = $(".displayDriverModal");
        this._driversController = null;
        this._driversList = driversList;
        this._driversList.onDriverChanged(driver => {
            this._driver = driver;
            this._repaint();
        });
        this._carsController = null;
        this._driver = null;
        this._cleanHTML = true;
        this._displayDriverPopupElement.find(".edit-driver").click(this._onEditDriverButtonClick.bind(this));
        this._displayDriverPopupElement.find(".delete-driver").click(this._onDeleteDriverButtonClick.bind(this));
        this._displayDriverPopupElement.modal({
            onHidden: this._destroy.bind(this)
        });
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    _repaint() {
        var statusDriversList = DriverStatus.colorsList;
        for(var color in statusDriversList){
            this._displayDriverPopupElement.find(".status").removeClass(statusDriversList[color]);
        }
        var elements = this._displayDriverPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            $(elements[i]).html(this._driver[getAttr]());
        }
        this._displayDriverPopupElement
            .find(".status")
            .addClass(statusDriversList[this._driver.getStatus()]);

        this._displayDriverPopupElement
            .find("[data-car-getattr]")
            .html( (this._driver.getCar() ? this._driver.getCar().toString() : '-') );

        if(this._driver.isDeleted()) {
            this._displayDriverPopupElement.find(".deletedStatus").show();
            this._displayDriverPopupElement.find(".status").hide();
            this._displayDriverPopupElement.find(".edit-driver").addClass("disabled");
            this._displayDriverPopupElement.find(".delete-driver").addClass("disabled");
        }
    }

    _destroy() {
        if(this._cleanHTML) {
            this._onDriverChangeUnsubscribe();
            $(".displayDriverModal").remove();
        }
    }

    showDriver(driver) {
        this._driver = driver;
        this._repaint();
        this._onDriverChangeUnsubscribe = this._driver.onChange(this._repaint.bind(this));
        this._displayDriverPopupElement.modal("show");
    }

    _onEditDriverButtonClick() {
        var popup = new EditDriverPopup({
            onClosed: () => {
                this._displayDriverPopupElement.modal("show");
                this._cleanHTML = true;
            }
        });
        this._cleanHTML = false;
        popup.setDriversController(this._driversController);
        popup.setCarsController(this._carsController);
        popup.show(this._driver);
    }

    _onDeleteDriverButtonClick() {
        this._cleanHTML = false;
        var questionBox = new QuestionMessageBox({
            onAccept: (function(){
                this._driversController.selectDeleteDriver(this._driver)
                    .then(() => {
                        this._cleanHTML = true;
                        this._destroy();
                    }).catch(error => {
                        console.log(error.code);
                        console.log(error.message);
                        var infoMessage = new InfoMessageBox({
                            onHidden: () => {
                                this._displayDriverPopupElement.modal("show");
                                this._cleanHTML = true;
                            },
                            messageText: "Не удалось удалить водителя из системы. Возможно он сейчас на заказе."
                        });
                        infoMessage.show();
                    });
            }).bind(this),
            onReject: (function(){
                this._displayDriverPopupElement.modal("show");
                this._cleanHTML = true;
            }).bind(this),
            messageText: "Вы действительно хотите удалить водителя из системы?"
        });
        questionBox.show();
    }
}