class Car {

    constructor(id, carParams) {
        this._id = id;
        this._stateCarNumber = carParams.stateCarNumber;
        this._gasolineConsumptionRatio = Number.parseInt(carParams.gasolineConsumptionRatio);
        this._brand = carParams.brand;
        this._description = carParams.description;
    }

    toString() {
        return this._brand + " " + this._stateCarNumber;
    }

    getId() {
        return this._id;
    }

    getStateCarNumber() {
        return this._stateCarNumber;
    }

    setStateCarNumber(stateCarNumber) {
    	this._stateCarNumber = stateCarNumber;
    }

    getGasolineConsumptionRatio() {
        return this._gasolineConsumptionRatio;
    }

    setGasolineConsumptionRatio(gasolineConsumptionRatio) {
    	this._gasolineConsumptionRatio = Number.parseInt(gasolineConsumptionRatio);
    }

    getBrand() {
        return this._brand;
    }

    setBrand(brand) {
    	this._brand = brand;
    }

    getDescription() {
        return this._description;
    }

    setDescription(description) {
        this._description = description;
    }
}