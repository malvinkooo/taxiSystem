class DriversTable {
    constructor(driversTableElement) {
        this._driversTableElement = driversTableElement;
        this._driversController = null;
        this._tbody = this._driversTableElement.find('table tbody');
        this._displayDriverPopup = new DisplayDriverPopup(this._driversTableElement.find(".displayDriverModal"));
        this._tbody.on("click", "tr", this._onDriverRowClick.bind(this));
    }

    setDriversController(driversController){
        this._driversController = driversController;
    }

    showDriversList(list){
       this._tbody.html("");
       for (var i = 0; i < list.length; i++) {
            var row = list[i];
            $('<tr data-driver-id='+row.id+'><td>'+row.name+
            '</td><td>'+row.surname+
            '</td><td>'+row.phone+
            '</td><td>'+row.status+
            '</td><td>'+row.currentLocation+
            '</td></tr>').appendTo(this._tbody)
       }
    }

    showDriverInfo(info) {
        this._displayDriverPopup.showDriverInfo(info);
    }

    _onDriverRowClick(e) {
        var driverId = e.currentTarget.dataset.driverId;
        this._driversController.selectDriver(driverId);
    }
}