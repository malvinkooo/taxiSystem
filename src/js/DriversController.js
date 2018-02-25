class DriversController {
    constructor(ui, driversList) {
        this._ui = ui;
        this._driversList = driversList;
    }

    selectMenuItemAllDrivers() {
        var list = this._driversList.getAllDrivers();
        this._ui.showDriversList(list);
    }

    selectDriver(id) {
        var info = this._driversList.getDriver(id);
        this._ui.showDriverInfo(info);
    }

    selectMenuItemAddDriver() {
        this._ui.showAddDriverForm();
    }

    addDriver(name, surname, phone){
        this._driversList.addDriver(name, surname, phone);
    }

    selectEditDriver() {
        var info = this.getDriver(id);
        this._ui.showDriverEdirForm(info);
    }

    editDriver(id, name, surname, phone) {
        var info = this._driversList.editDriver(id, name, surname, phone);
        this._ui.showSuccessNotification();
        this._ui.shorDriverInfo(info);
    }

    selectDeleteDriver(id) {
        this._driversList.deleteDriver(id);
        this._ui.showSuccessNotification();
        var list = this._driversList.getAllDrivers();
        this._ui.showDriversList(list);
    }
}