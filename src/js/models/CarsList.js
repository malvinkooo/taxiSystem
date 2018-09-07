class CarsList {

    constructor() {
        this._emitter = new EventEmitter();
    }

    getAllCars() {
        return new Promise(function(resolve, reject){
            $.ajax({
                url: '/api/cars',
                type: 'get',
                success: function(data) {
                    var list = [];
                    for (var i = 0; i < data.length; i++) {
                        list.push( new Car(data[i]) );
                    }
                    resolve(list);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    }

    addCar(carParams) {
        var car = new Car(this._lastInsertId, carParams);
        this._cars[this._lastInsertId] = car;
        this._lastInsertId++;
        this._emitter.emit("carAdded", car);
    }

    getCar(id) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: '/api/cars/' + id,
                type: 'get',
                success: function(data) {
                    resolve( new Car(data) );
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    }

    editCar(carParams) {
        return new Promise(function(resolve, reject){
            $.ajax({
                url: '/api/cars/' + car.params.id,
                type: 'put',
                contentType: "application/json",
                data: JSON.stringify(carParams),
                success: function(data) {
                    resolve(data);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
        this._emitter.emit("carChanged", car);
    }

    deleteCar(id) {
        return new Promise((function(resolve, reject){
            $.ajax({
                url: '/api/cars/' + id,
                type: 'delete',
                success: data => {
                    this._emitter.emit("carRemoved");
                    resolve();
                },
                error: function(error){
                    reject(error);
                }
            });
        }).bind(this));

    }

    getCarsCount() {
        return Object.keys(this._cars).length;
    }

    onCarAdded(fn) {
        this._emitter.subscribe("carAdded", fn);
    }

    onCarChanged(fn) {
        this._emitter.subscribe("carChanged", fn);
    }

    onCarRemoved(fn) {
        this._emitter.subscribe("carRemoved", fn);
    }
}