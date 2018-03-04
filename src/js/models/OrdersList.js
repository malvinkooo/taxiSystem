class OrdersList {

    constructor(geoService) {
        this._orders = {};
        this._lastInsertId = 0;
    }

    addOrder(orderParams, geoService) {
        var order = new Order(this._lastInsertId, orderParams, geoService);
        this._orders.push(order);
        this._lastInsertId++;
    }

    getAllOrders() {
        var result = [];
        for(var id in this._orders) {
            var order = this._orders[id];
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

    getOrdersCount() {
        return Object.keys(this._orders).length;
    }

    getOrdersInProgressCount() {
        var ordersInPtogressCount = 0;
        for(var id in this._orders) {
            var order = this._orders[id];
            if(order.getstatus() === OrderStatus.IN_PROGRESS) {
                ordersInPtogressCount++;
            }
        }
        return ordersInPtogressCount;
    }

    getOrdersByCreationDate(startdate, enddate) {
        var result = [];
        for(var key in this._orders) {
            var date = this._orders[key].getDateOfCreation();
            if(date >== startdate && date <== enddate) {
                result.push(this._orders[key]);
            }
        }
        return result;
    }
}