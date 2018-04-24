class DriversTable {
    constructor(driversTableElement) {
        this._driversTableElement = driversTableElement;
        this._driversController = null;
        this._tbody = this._driversTableElement.find('table tbody');
        this._displayDriverPopup = new DisplayDriverPopup(this._driversTableElement.find(".displayDriverModal"));
        this._editDriverPopup = new EditDriverPopup(this._driversTableElement.find(".editDriverModal"));
        this._tbody.on("click", "tr", this._onDriverRowClick.bind(this));
    }

    setDriversController(driversController){
        this._driversController = driversController;
        this._displayDriverPopup.setDriversController(driversController);
        this._editDriverPopup.setDriversController(driversController);
    }

    showDriversList(list){
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
}