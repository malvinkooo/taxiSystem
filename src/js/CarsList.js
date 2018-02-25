class CarsList {

    constructor() {
        this._cars = [];
    }

    addCar(stateCarNumber, gasolineConsumptionRatio, brand) {
        var car = new Car(stateCarNumber, gasolineConsumptionRatio, brand);
        this._cars.push(car);
    }

    getAllCars() {
        var result = [];
        for(var i=0; i < this._cars; i++) {
            var car = this._cars[i];
            result.push( car.getInfo() );
        }
        return result;
    }
}