class DriversTable {
    constructor(driversTableElement, driversList) {
        this._driversTableElement = driversTableElement;
        this._driversController = null;
        this._carsController = null;
        this._driversList = driversList;
        this._tbody = this._driversTableElement.find('table tbody');
        this._driversList.onDriverAdded(this._driverAdded.bind(this));
        this._driversList.onDriverChanged(this._driverChanged.bind(this));
        this._tbody.on("click", "tr", this._onDriverRowClick.bind(this));

        this._showDriversList();
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    setDriversController(driversController){
        this._driversController = driversController;
    }

    _showDriversList(){
        var promise = driversList.getAllDrivers();
        promise.then(list => {
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
                    '</td><td>'+ (driver.getCar() ? driver.getCar() : '-') +
                    '</td></tr>').appendTo(this._tbody);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    showDriver(driver) {
        var popup = new DisplayDriverPopup();
        popup.setDriversController(this._driversController);
        popup.setCarsController(this._carsController);
        popup.showDriver(driver);
    }

    _onDriverRowClick(e) {
        var driverId = e.currentTarget.dataset.driverId;
        var promise = this._driversList.getDriver(driverId);
        promise.then(driver => this.showDriver(driver));
    }

    _driverAdded() {
        this._showDriversList();
    }

    _driverChanged() {
        this._showDriversList();
    }
}