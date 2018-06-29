class DriversTable {
    constructor(driversTableElement, driversList) {
        this._driversTableElement = driversTableElement;
        this._driversController = null;
        this._driversList = driversList;
        this._tbody = this._driversTableElement.find('table tbody');
        this._displayDriverPopup = new DisplayDriverPopup(this._driversTableElement.find(".displayDriverModal"));
        this._editDriverPopup = new EditDriverPopup(this._driversTableElement.find(".editDriverModal"));

        this._driversList.onDriverAdded(this._driverAdded.bind(this));
        this._driversList.onDriverChanged(this._driverChanged.bind(this));

        this._tbody.on("click", "tr", this._onDriverRowClick.bind(this));
    }

    setCarsController(carsController) {
        this._editDriverPopup.setCarsController(carsController);
    }

    setDriversController(driversController){
        this._driversController = driversController;
        this._displayDriverPopup.setDriversController(driversController);
        this._editDriverPopup.setDriversController(driversController);
    }

    _showDriversList(){
        var list = driversList.getAllDrivers();
       this._tbody.html("");
       var statusColorsList = DriverStatus.colorsList;
       for (var i = 0; i < list.length; i++) {
            var driver = list[i];
            $('<tr data-driver-id='+driver.getId()+'><td>'+driver.getName()+
            '</td><td>'+driver.getSurname()+
            '</td><td>'+driver.getPhone()+
            '</td><td><button class="ui button driver-status '
                +statusColorsList[driver.getStatus()]+'">'
                +driver.getStatus()+
            '</button></td><td>'+driver.getCurrentLocation()+
            '</td><td>'+driver.getCar()+
            '</td></tr>').appendTo(this._tbody)
       }
    }

    showDriver(driver) {
        this._displayDriverPopup.showDriver(driver);
    }

    showEditDriverForm(driver) {
        this._editDriverPopup.showEditDriverForm(driver);
    }

    _onDriverRowClick(e) {
        var driverId = e.currentTarget.dataset.driverId;
        this._driversController.selectDriver(driverId);
    }

    _driverAdded() {
        console.log("Driver has been added");
        this._showDriversList();
    }

    _driverChanged() {
        console.log("Driver has been changed");
        this._showDriversList();
    }
}