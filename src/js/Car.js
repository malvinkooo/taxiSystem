class Car {

    constructor(id, carParams) {
        this._id = id;
        this._stateCarNumber = carParams.stateCarNumber;
        this._gasolineConsumptionRatio = carParams.gasolineConsumptionRatio;
        this._brand = carParams.brand;
    }

    getInfo() {
    	return {
    		stateCarNumber: this._stateCarNumber,
    		gasolineConsumptionRatio: this._gasolineConsumptionRatio,
    		brand: this._brand
    	};
    }

    setStateCarNumber(stateCarNumber) {
    	this._stateCarNumber = stateCarNumber;
    }

    setGasolineConsumptionRatio(gasolineConsumptionRatio) {
    	this._gasolineConsumptionRatio = gasolineConsumptionRatio;
    }

    setBrand(brand) {
    	this._brand = brand;
    }
}