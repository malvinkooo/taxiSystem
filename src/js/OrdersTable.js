class OrdersTable {
    constructor(ordersTableElement) {
        this._ordersTableElement = ordersTableElement;
        this._tbody = this._ordersTableElement.find('table tbody');
    }    

    show(list) {
        this._tbody.html('');
        for(var i=0; i < list.length; i++) {
            var row = list[i];
            $('<tr><td>'+ row.clientName + 
                '</td><td>' + row.clientPhone + 
                '</td><td>' + row.carFeedPoint +
                '</td><td>' + row.destination + 
                '</td><td>' + row.distance +
                '</td><td>' + row.rate +
                '</td><td>' + row.status +
                '</td><td>' + row.dateOfCreation +
                '</td><td>' + row.dateOfCompletion +
                '</td><td>' + row.driver +
                '</td></tr>').appendTo(this._tbody);
        }        
    }
}