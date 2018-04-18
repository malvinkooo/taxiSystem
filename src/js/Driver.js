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

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    setSurname(surname) {
        this._surname = surname;
    }

    setPhone(phone) {
        this.phone = phone;
    }

    setCurrentLocation(currentLocation) {
        this._currentLocation = currentLocation;
    }

    getInfo() {
        return {
            id: this._id,
            name: this._name,
            surname: this._surname,
            phone: this._phone,
            currentLocation: this._currentLocation,
            status: this._status
        };
    }

    getStatus() {
        return this._status;
    }

    setStatus(status) {
        this._status = status;
    }
}