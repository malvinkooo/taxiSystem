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

    showDriverInfo(info) {
        this._lastDriverId = info.id;
    	var statusDriversList = DriverStatus.colorsList;
    	for(var color in statusDriversList){
    		this._displayDriverPopupElement.find(".status").removeClass(statusDriversList[color]);
    	}
        for(var key in info){
        	this._displayDriverPopupElement.find("." + key).html(info[key]);
        }
        this._displayDriverPopupElement.find(".status").addClass(statusDriversList[info.status]);
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
            questionBox.hide();
        }).bind(this), (function(){
            questionBox.hide();
            this._driversController.selectDriver(this._lastDriverId);
        }).bind(this));
    }
}