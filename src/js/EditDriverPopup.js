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

    showEditDriverForm(info) {
        this._lastDriverId = info.id;
        for(var key in info){
            this._editDriverPopupElement.find("." + key).val(info[key]);
        }
        this._editDriverPopupElement.find(".id").html(info.id);
        this._statusListSelectElement.dropdown('set selected',[info['status']]);
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