class CarsList {

    constructor() {
        this._cars = {};
        this._lastInsertId = 0;
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
    }

    getCar(id) {
        return this._cars[id];
    }

    editCar(id, stateCarNumber, gasolineConsumptionRatio, brand) {
        var car = this._list[id];
        car.setStateCarNumber(stateCarNumber);
        car.setGasolineConsumptionRatio(gasolineConsumptionRatio);
        car.setBrand(brand);
    }

    deleteCar(id) {
        delete this._cars[id];
    }

    getCarsCount() {
        return Object.keys(this._cars).length;
    }
}