class CarsController {
    constructor(ui, cars) {
        this._ui = ui;
        this._cars = cars;
    }

    selectMenuItemAddCar() {
        this._ui.showAddCarForm();
    }

    addCar(stateCarNumber, gasolineConsumptionRatio, brand) {
        this._cars.addCar(stateCarNumber, gasolineConsumptionRatio, brand);
        this._ui.showSuccessNotification();
        var list = this._cars.getAllCars();
        this._ui.showAllCars(list);
    }
}