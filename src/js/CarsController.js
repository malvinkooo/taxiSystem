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
        this._ui.showAllCars(list);
    }

    selectCar(id) {
        var info = this._cars.getCar(id);
        this._ui.showCarInfo(info);
    }

    selectMenuItemEditCar(id) {
        var info = this._car.getCar(id);
        this._ui.showEditCarform(info);
    }

    editCar(id, stateCarNumber, gasolineConsumptionRatio, brand) {
        this._cats.editCar(id, stateCarNumber, gasolineConsumptionRatio, brand);
        this._ui.showSuccessNotification();
        var info = this._cars.getCar(id);
        this._ui.showCarInfo(info);
    }

    deleteCar(id) {
        this._cars.deleteCar(id);
        this._ui.showSuccessNotification();
        var list = this._cars.getAllCars();
        this._ui.showAllCars(list);
    }
}