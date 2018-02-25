class OrdersList {

    constructor() {
        this._orders = [];
    }

    addOrder(orderParams) {
        var order = new Order(orderParams);
        var distance = order.getDistance;
        order.setDistance(distance);
        this._orders.push(order)
    }

    getAllorders() {
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