class CarsController {
    constructor(cars) {        
        this._cars = cars;
    }

    selectMenuItemCars() {
        ui.showMenuCars();
    }

    addCar(stateCarNumber, gasolineConsumptionRatio, brand) {
        this._cars.addCar(stateCarNumber, gasolineConsumptionRatio, brand);
        ui.showSuccessNotification();
        setTimeout(function(){
            var list = this._cars.getAllCars();
            ui.showAllCars(list);
        }.bind(this), 1000);        
    }

    selectMenuItemAllCars() {
        var list = this._cars.getAllCars();
        ui.showAllCars(list);
    }

    selectCar(id) {
        var info = this._cars.getCar(id);
        ui.showCarInfo(info);
    }

    selectMenuItemEditCar(id) {
        var info = this._car.getCar(id);
        ui.showEditCarform(info);
    }

    editCar(id, stateCarNumber, gasolineConsumptionRatio, brand) {
        this._cars.editCar(id, stateCarNumber, gasolineConsumptionRatio, brand);
        ui.showSuccessNotification();
        var info = this._cars.getCar(id);
        ui.showCarInfo(info);
    }

    deleteCar(id) {
        this._cars.deleteCar(id);
        ui.showSuccessNotification();
        var list = this._cars.getAllCars();
        ui.showAllCars(list);
    }
}