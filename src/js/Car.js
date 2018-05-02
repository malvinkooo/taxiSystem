class Car {

    constructor(id, carParams) {
        this._id = id;
        this._stateCarNumber = carParams.stateCarNumber;
        this._gasolineConsumptionRatio = carParams.gasolineConsumptionRatio;
        this._brand = carParams.brand;
        this._description = carParams.description;
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
    	this._gasolineConsumptionRatio = gasolineConsumptionRatio;
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