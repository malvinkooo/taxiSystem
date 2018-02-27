class Car {

    constructor(stateCarNumber, gasolineConsumptionRatio, brand) {
        this._stateCarNumber = stateCarNumber;
        this._gasolineConsumptionRatio = gasolineConsumptionRatio;
        this._brand = brand;
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