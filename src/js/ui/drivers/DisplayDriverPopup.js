class DisplayDriverPopup {
    constructor(displayDriverPopupElement) {
        this._displayDriverPopupElement = displayDriverPopupElement;
        this._driversController = null;
        this._lastDriver = null;
        this._displayDriverPopupElement.find(".edit-driver").click(this._onEditDriverButtonClick.bind(this));
        this._displayDriverPopupElement.find(".delete-driver").click(this._onDeleteDriverButtonClick.bind(this));
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    showDriver(driver) {
        this._lastDriver = driver;
        var statusDriversList = DriverStatus.colorsList;
        for(var color in statusDriversList){
            this._displayDriverPopupElement.find(".status").removeClass(statusDriversList[color]);
        }
        var elements = this._displayDriverPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            $(elements[i]).html(driver[getAttr]());
        }
        this._displayDriverPopupElement.find(".status").addClass(statusDriversList[driver.getStatus()]);
        this._displayDriverPopupElement.find("[data-car-getAttr]").html(driver.getCar().toString());
        this._displayDriverPopupElement.modal("show");
    }

    _onEditDriverButtonClick() {
        this._driversController.selectEditDriver(this._lastDriver.getId());
    }

    _onDeleteDriverButtonClick() {
        var questionBox = new QuestionMessageBox("Вы действительно хотите удалить водителя?");
        questionBox.show((function(){
            this._driversController.selectDeleteDriver(this._lastDriver.getId());
        }).bind(this), (function(){
            this._driversController.selectDriver(this._lastDriver.getId());
        }).bind(this));
    }
}