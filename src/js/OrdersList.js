class OrdersList {

    constructor(geoService) {
        this._orders = [];  
    }

    addOrder(orderParams, geoService) {
        var order = new Order(orderParams, geoService);        
        this._orders.push(order)
    }

    getAllOrders() {
        var result = [];
        for(var i=0; i < this.order; i++) {
            var order = this.order[i];
            result.push( order.getInfo() );
        }
        return result;
    }

    editOrder(id, orderParams) {
        var order = this._orders[id];
        order.setClientname(orderParams.clientname);
        order.setClientPhone(orderParams.clientPhone);
        order.setDateofCompletion();
        order.setCarFeedPoint(orderParams.carFeedPoint);
        order.setRate(orderParams.rate);
    }

    getOrder(id) {
        return this._orders[id].getInfo();
    }
}