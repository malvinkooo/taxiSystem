class CarsController {
    constructor(ui, cars) {
        this._ui = ui;
        this._cars = cars;
    }

    addCar(stateCarNumber, gasolineConsumptionRatio, brand) {
        this._cars.addCar(stateCarNumber, gasolineConsumptionRatio, brand);
        this._ui.showSuccessNotification();
        setTimeout(function(){
            var list = this._cars.getAllCars();
            this._ui.showAllCars(list);
        }.bind(this), 1000);
    }

    selectMenuItemAllCars() {
        var list = this._cars.getAllCars();
        this._ui.showCarsList(list);
    }

    selectCar(id) {
        var car = this._cars.getCar(id);
        this._ui.showCar(car);
    }

    selectEditCar(id) {
        var car = this._cars.getCar(id);
        this._ui.showEditCarForm(car);
    }

    editCar(carParams) {
        var car = this._cars.editCar(carParams);
        this._ui.showCar(car);
    }

    deleteCar(id) {
        this._cars.deleteCar(id);
        this._ui.showSuccessNotification();
        var list = this._cars.getAllCars();
        this._ui.showAllCars(list);
    }
}