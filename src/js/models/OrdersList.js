class OrdersList {

    constructor() {
        this._orders = {};
        this._lastInsertId = 0;
        this._emitter = new EventEmitter();
    }

    addOrder(orderParams, geoService) {
        var order = new Order(this._lastInsertId, orderParams, geoService);
        this._orders[this._lastInsertId] = order;
        this._lastInsertId++;
        this._emitter.emit("orderAdded", order);
    }

    getAllOrders() {
        return new Promise(function(resolve, reject){
            $.ajax({
                url: '/api/orders',
                type: 'get',
                success: function(data) {
                    var list = [];
                    for(var i = 0; i < data.length; i++) {
                        list.push( new Order(data[i]) );
                    }
                    resolve(list);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    }

    editOrder(orderParams) {
        var order = this._orders[orderParams.id];
        order.setClientName(orderParams.clientName);
        order.setClientPhone(orderParams.clientPhone);
        order.setDateOfComplention(orderParams.dateOfCompletion);
        order.setCarFeedPoint(orderParams.carFeedPoint);
        order.setDestination(orderParams.destination);
        order.setDistance(orderParams.distance)
        order.setRate(orderParams.rate);
        order.setStatus(orderParams.status);
        order.setDriver(orderParams.driver);
        this._emitter.emit("orderChanged", order);
        return order;
    }

    getOrder(id) {
        return this._orders[id];
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

    onOrderAdded(fn) {
        this._emitter.subscribe("orderAdded", fn);
    }

    onOrderChanged(fn) {
        this._emitter.subscribe("orderChanged", fn);
    }
}