class OrdersList {

    constructor() {
        this._orders = {};
        this._lastInsertId = 0;
    }

    addOrder(orderParams, geoService) {
        var order = new Order(this._lastInsertId, orderParams, geoService);
        this._orders[this._lastInsertId] = order;
        this._lastInsertId++;
    }

    getAllOrders() {
        var result = [];
        for(var id in this._orders) {
            var order = this._orders[id];
            result.push( order.getOrder() );
        }
        return result;
    }

    editOrder(orderParams) {
        var order = this._orders[orderParams.id];
        order.setClientName(orderParams.clientName);
        order.setClientPhone(orderParams.clientPhone);
        order.setDateOfComplention(orderParams.dateOfCompletion);
        order.setCarFeedPoint(orderParams.carFeedPoint);
        order.setDestination(orderParams.destination);
        order.setRate(orderParams.rate);
        order.setStatus(orderParams.status);
    }

    getOrder(id) {
        return this._orders[id].getOrder();
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
            if(date >= startdate && date <= enddate) {
                result.push(this._orders[key]);
            }
        }
        return result;
    }
}