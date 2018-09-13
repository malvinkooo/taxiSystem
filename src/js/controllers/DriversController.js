class DriversController {
    constructor(ui, carsList, driversList) {
        this._ui = ui;
        this._carsList = carsList;
        this._driversList = driversList;
    }

    getDriversList() {
        return this._driversList.getAllDrivers();
    }

    selectMenuItemAllDrivers() {
        this._ui.showDriversList();
    }

    selectMenuItemAddDriver() {
        this._ui.showAddDriverForm();
    }

    addDriver(driverParams){
        return this._driversList.addDriver(driverParams);
    }

    editDriver(driverParams) {
        driverParams.car = this._carsList.getCar(driverParams.car);
        var driver = this._driversList.editDriver(driverParams);
    }

    selectDeleteDriver(driver) {
        return this._driversList.deleteDriver(driver.getId());
    }
}