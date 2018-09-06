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
        var car = this._cars[carParams.id];
        car.setStateCarNumber(carParams.stateCarNumber);
        car.setBrand(carParams.brand);
        car.setGasolineConsumptionRatio(carParams.gasolineConsumptionRatio);
        car.setDescription(carParams.description);
        this._emitter.emit("carChanged", car);
        return car;
    }

    deleteCar(id) {
        delete this._cars[id];
        this._emitter.emit("carRemoved");
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