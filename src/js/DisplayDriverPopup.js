class DisplayDriverPopup {
    constructor(displayDriverPopupElement) {
        this._displayDriverPopupElement = displayDriverPopupElement;
        this._driversController = null;
        this._displayDriverPopupElement.find(".edit-driver").click(this._onEditDriverButtonClick.bind(this));
        this._displayDriverPopupElement.modal({
            onHide: this._onDisplayDriverPopupClose.bind(this)
        });
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    showDriver(driver) {
    	var statusDriversList = DriverStatus.colorsList;
    	for(var color in statusDriversList){
    		this._displayDriverPopupElement.find(".status").removeClass(statusDriversList[color]);
    	}
        this._displayDriverPopupElement.find(".id").html(driver.getId());
        this._displayDriverPopupElement.find(".name").html(driver.getName());
        this._displayDriverPopupElement.find(".surname").html(driver.getSurname());
        this._displayDriverPopupElement.find(".phone").html(driver.getPhone());
        this._displayDriverPopupElement.find(".status").html(driver.getStatus());
        this._displayDriverPopupElement.find(".edit-driver").attr("data-driver-id", driver.getId());
        this._displayDriverPopupElement.find(".status").addClass(statusDriversList[driver.getStatus()]);
        this._displayDriverPopupElement.modal("show");
    }

    _onEditDriverButtonClick(e) {
        var driverId = e.target.dataset.driverId;
        this._driversController.selectEditDriver(driverId);
    }

    _onDisplayDriverPopupClose() {
        this._driversController.selectMenuItemAllDrivers();
    }
}