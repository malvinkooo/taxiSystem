class CarsList {

    constructor() {
        this._cars = {};
        this._lastInsertId = 0;
        this._emitter = new EventEmitter();
    }

    getAllCars() {
        var result = [];
        for(var id in this._cars) {
            var car = this._cars[id];
            result.push(car);
        }
        return result;
    }

    addCar(carParams) {
        var car = new Car(this._lastInsertId, carParams);
        this._cars[this._lastInsertId] = car;
        this._lastInsertId++;
        this._emitter.emit("carAdded", car);
    }

    getCar(id) {
        return this._cars[id];
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
}