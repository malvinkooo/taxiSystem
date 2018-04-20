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
        this._currentLocation = undefined;
        this._status = DriverStatus.FREE;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    getSurname() {
        return this._surname;
    }

    setSurname(surname) {
        this._surname = surname;
    }

    getPhone() {
        return this._phone;
    }

    setPhone(phone) {
        this._phone = phone;
    }

    getCurrentLocation() {
        return this._currentLocation;
    }

    setCurrentLocation(currentLocation) {
        this._currentLocation = currentLocation;
    }

    getStatus() {
        return this._status;
    }

    setStatus(status) {
        this._status = status;
    }
}