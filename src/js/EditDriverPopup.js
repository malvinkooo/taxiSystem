class EditDriverPopup {
    constructor(editDriverPopupElement){
        this._editDriverPopupElement = editDriverPopupElement;
        this._driversController = null;
        this._lastDriverId = null;
        this._statusListSelectElement = this._editDriverPopupElement.find("select.status-list");
        var statusList = DriverStatus.statusList;
        for (var i = 0; i < statusList.length; i++) {
            this._statusListSelectElement.append("<option value='"
                +statusList[i]+"'>"
                +statusList[i]+
            "</option>");
        }
        this._statusListSelectElement.dropdown({showOnFocus: false});
        this._editDriverPopupElement.find(".submit").click(this._onEditFormSubmit.bind(this));
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    showEditDriverForm(driver) {
        this._lastDriverId = driver.getId();
        var elements = this._editDriverPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var getAttr = $(elements[i]).attr("data-getAttr");
            $(elements[i]).val(driver[getAttr]());
        }
        this._statusListSelectElement.dropdown('set selected', driver.getStatus());
        this._editDriverPopupElement.modal("show");
    }

    _onEditFormSubmit() {
        var driverParams = {};
        driverParams['id'] = this._lastDriverId;
        var elements = this._editDriverPopupElement.find("input, select");
        for (var i = 0; i < elements.length; i++) {
            driverParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        this._driversController.editDriver(driverParams);
    }
}