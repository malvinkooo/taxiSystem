class DisplayDriverPopup {
    constructor(displayDriverPopupElement) {
        this._displayDriverPopupElement = displayDriverPopupElement;
        this._driversController = null;
        this._displayDriverPopupElement.find(".edit-driver").click(this._onEditDriverButtonClick.bind(this));
        this._displayDriverPopupElement.modal({
            onHide: this._onDisplayDriverPopupClose.bind(this)
        });
        this._displayDriverPopupElement.find(".delete-driver").click(this._onDeleteDriverButtonClick.bind(this));
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    showDriverInfo(info) {
    	var statusDriversList = DriverStatus.colorsList;
    	for(var color in statusDriversList){
    		this._displayDriverPopupElement.find(".status").removeClass(statusDriversList[color]);
    	}
        for(var key in info){
        	this._displayDriverPopupElement.find("." + key).html(info[key]);
        }
        this._displayDriverPopupElement.find(".edit-driver").attr("data-driver-id", info.id);
        this._displayDriverPopupElement.find(".delete-driver").attr("data-driver-id", info.id);
        this._displayDriverPopupElement.find(".status").addClass(statusDriversList[info.status]);
        this._displayDriverPopupElement.modal("show");
    }

    _onEditDriverButtonClick(e) {
        var driverId = e.target.dataset.driverId;
        this._driversController.selectEditDriver(driverId);
    }

    _onDisplayDriverPopupClose() {
        this._driversController.selectMenuItemAllDrivers();
    }

    _onDeleteDriverButtonClick(e) {
        var driverId = e.target.dataset;
        console.log(driverId);
        var questionBox = new QuestionMessageBox("Вы действительно хотите удалить водителя?");
        questionBox.show(function(){
            console.log("Driver has been deleted");
        }, function(){
            this._driversController.selectDriver(driverId);
        });
    }
}