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
}