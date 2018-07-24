class DriverStatus {

    static get ABSENT() {
        return "Отсутствует";
    }

    static get FREE() {
        return "Свободен";
    }

    static get BUSY() {
        return "На заказе";
    }

    static get statusList() {
        return [
            'Отсутствует',
            'Свободен',
            'На заказе',
        ];
    }

    static get colorsList() {
        return {
            'Отсутствует': 'grey',
            'Свободен': 'green',
            'На заказе': 'red',
        };
    }
}


class Driver {
    constructor(id, driverParams) {
        this._id = id;
        this._name = driverParams.name;
        this._surname = driverParams.surname;
        this._phone = driverParams.phone;
        this._description = driverParams.description;
        if(driverParams.car) {
            this._car = driverParams.car;
            this._car.assign();
        }
        this._currentLocation = "-";
        this._status = DriverStatus.FREE;
        this._emitter = new EventEmitter();
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
        this._emitter.emit("driverChanged");
    }

    getSurname() {
        return this._surname;
    }

    setSurname(surname) {
        this._surname = surname;
        this._emitter.emit("driverChanged");
    }

    getFullName() {
        return this._surname + " " + this._name;
    }

    getPhone() {
        return this._phone;
    }

    setPhone(phone) {
        this._phone = phone;
        this._emitter.emit("driverChanged");
    }

    getCurrentLocation() {
        return this._currentLocation;
    }

    setCurrentLocation(currentLocation) {
        this._currentLocation = currentLocation;
        this._emitter.emit("driverChanged");
    }

    getStatus() {
        return this._status;
    }

    setStatus(status) {
        this._status = status;
        this._emitter.emit("driverChanged");
    }

    getDescription() {
        return this._description;
    }

    setDescription(description) {
        this._description = description;
        this._emitter.emit("driverChanged");
    }

    getCar() {
        return this._car;
    }

    setCar(car) {
        this._car = car;
        this._emitter.emit("driverChanged");
    }

    onChange(fn) {
        return this._emitter.subscribe("driverChanged", fn);
    }
}