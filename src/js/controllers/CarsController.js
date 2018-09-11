class CarsController {
    constructor(ui, cars) {
        this._ui = ui;
        this._cars = cars;
    }

    addCar(carParams) {
        return this._cars.addCar(carParams);
    }

    getCarsList() {
        return this._cars.getAllCars();
    }

    selectMenuItemAllCars() {
        this._ui.showCarsList();
    }

    editCar(carParams) {
        return this._cars.editCar(carParams);
    }

    selectDeleteCar(car) {
        return this._cars.deleteCar(car.getId());
    }
}