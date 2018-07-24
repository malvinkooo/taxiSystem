class CarsController {
    constructor(ui, cars) {
        this._ui = ui;
        this._cars = cars;
    }

    addCar(carParams) {
        this._cars.addCar(carParams);
        var list = this._cars.getAllCars();
        this._ui.showCarsList(list);
    }

    getCarsList() {
        return this._cars.getAllCars();
    }

    selectMenuItemAllCars() {
        this._ui.showCarsList();
    }

    editCar(carParams) {
        var car = this._cars.editCar(carParams);
    }

    selectDeleteCar(car) {
        var result;
        if(!car.isAssigned()) {
            this._cars.deleteCar(car.getId());
            result = true;
        } else {
            console.log("При удалении машины что-то пошло не так.");
            result = false;
        }
        return result;
    }
}