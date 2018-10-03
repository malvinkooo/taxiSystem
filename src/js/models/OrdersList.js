class OrdersList {

    constructor() {
        this._emitter = new EventEmitter();
    }

    addOrder(orderParams) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/orders',
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify(orderParams),
                success: data => {
                    var order = new Order(data);
                    this._emitter.emit("orderAdded", order);
                    resolve(order);
                },
                error: error => {
                    var errorInfo = {};
                    if(error.responseJSON) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке добавит ьновый заказ.';
                    }
                    reject(error);
                }
            });
        });
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
                    var errorInfo = {};
                    if(error.responseJSON) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке получить список заказов.';
                    }
                    reject(errorInfo);
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
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: '/api/orders/' + id,
                type: 'get',
                success: function(data) {
                    resolve( new Order(data) );
                },
                error: function(error) {
                    console.log(error);
                    var errorInfo = {};
                    if(error.responseJSON) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке получить информацию о заказе.';
                    }
                    reject(errorInfo);
                }
            });
        });
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