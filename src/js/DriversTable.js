class DriversTable {
    constructor(driversTableElement) {
        this._driversTableElement = driversTableElement;
        this._tbody = this._driversTableElement.find('table tbody');
    }

    showDriversList(list){
       this._tbody.html("");
       for (var i = 0; i < list.length; i++) {
            var row = list[i];
            $('<tr><td>'+row.name+
            '</td><td>'+row.surname+
            '</td><td>'+row.phone+
            '</td><td>'+row.status+
            '</td><td>'+row.currentLocation+
            '</td></tr>').appendTo(this._tbody)
       }
    }
}