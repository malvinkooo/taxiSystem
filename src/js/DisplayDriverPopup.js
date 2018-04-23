class DisplayDriverPopup {
    constructor(displayDriverPopupElement) {
        this._displayDriverPopupElement = displayDriverPopupElement;
        this._driversController = null;
        this._lastDriverId = null;
        this._displayDriverPopupElement.find(".edit-driver").click(this._onEditDriverButtonClick.bind(this));
        this._displayDriverPopupElement.modal({
            onHide: this._onDisplayDriverPopupClose.bind(this)
        });
        this._displayDriverPopupElement.find(".delete-driver").click(this._onDeleteDriverButtonClick.bind(this));
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    showDriver(driver) {
        this._lastDriverId = driver.getId();
        var statusDriversList = DriverStatus.colorsList;
        for(var color in statusDriversList){
            this._displayDriverPopupElement.find(".status").removeClass(statusDriversList[color]);
        }
        var elements = this._displayDriverPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            this._displayDriverPopupElement
                .find("[data-getAttr="+getAttr+"]")
                .html(driver[getAttr]());
        }
        this._displayDriverPopupElement.find(".edit-driver").attr("data-driver-id", driver.getId());
        this._displayDriverPopupElement.find(".status").addClass(statusDriversList[driver.getStatus()]);
        this._displayDriverPopupElement.modal("show");
    }

    _onEditDriverButtonClick() {
        this._driversController.selectEditDriver(this._lastDriverId);
    }

    _onDisplayDriverPopupClose() {
        this._driversController.selectMenuItemAllDrivers();
    }

    _onDeleteDriverButtonClick() {
        var questionBox = new QuestionMessageBox("Вы действительно хотите удалить водителя?");
        questionBox.show((function(){
            this._driversController.selectDeleteDriver(this._lastDriverId);
        }).bind(this), (function(){
            this._driversController.selectDriver(this._lastDriverId);
        }).bind(this));
    }
}