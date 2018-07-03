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

    selectCar(id) {
        var car = this._cars.getCar(id);
        this._ui.showCar(car);
    }

    editCar(carParams) {
        var car = this._cars.editCar(carParams);
    }

    selectDeleteCar(id) {
        this._cars.deleteCar(id);
        var list = this._cars.getAllCars();
        this._ui.showCarsList(list);
    }
}