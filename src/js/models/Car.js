class Car {

    constructor(carParams) {
        this._id = carParams.id;
        this._stateCarNumber = carParams.stateCarNumber;
        this._gasolineConsumptionRatio = Number.parseFloat(carParams.gasolineConsumptionRatio);
        this._brand = carParams.brand;
        this._description = carParams.description;
        this._isDeleted = Boolean( Number(carParams.isDeleted) );
        this._emitter = new EventEmitter();
    }

    toString() {
        return this._brand + " " + this._stateCarNumber;
    }

    isDeleted() {
        return this._isDeleted;
    }

    getId() {
        return this._id;
    }

    getStateCarNumber() {
        return this._stateCarNumber;
    }

    setStateCarNumber(stateCarNumber) {
        this._stateCarNumber = stateCarNumber;
        this._emitter.emit("carChanged");
    }

    getGasolineConsumptionRatio() {
        return this._gasolineConsumptionRatio;
    }

    setGasolineConsumptionRatio(gasolineConsumptionRatio) {
        this._gasolineConsumptionRatio = Number.parseFloat(gasolineConsumptionRatio);
        this._emitter.emit("carChanged");
    }

    getBrand() {
        return this._brand;
    }

    setBrand(brand) {
        this._brand = brand;
        this._emitter.emit("carChanged");
    }

    getDescription() {
        return this._description;
    }

    setDescription(description) {
        this._description = description;
        this._emitter.emit("carChanged");
    }

    onChange(fn) {
        return this._emitter.subscribe("carChanged", fn);
    }
}