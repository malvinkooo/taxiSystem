class DisplayDriverPopup {
    constructor(displayDriverPopupElement) {
        this._displayDriverPopupElement = displayDriverPopupElement;
    }

    showDriverInfo(info) {
    	var statusDriversList = DriverStatus.colorsList;
    	for(var color in statusDriversList){
    		this._displayDriverPopupElement.find("status").removeClass(statusDriversList[color]);
    	}
        for(var key in info){
        	this._displayDriverPopupElement.find("." + key).html(info[key]);
        }
        this._displayDriverPopupElement.find(".status").addClass(statusDriversList[info.status]);
        this._displayDriverPopupElement.modal("show");
    }
}