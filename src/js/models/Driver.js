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
    constructor(driverParams) {
        this._id = driverParams.id;
        this._name = driverParams.name;
        this._surname = driverParams.surname;
        this._phone = driverParams.phone;
        this._description = driverParams.description;
        this._isDeleted = Boolean( Number(driverParams.isDeleted) );
        this._car = driverParams.car ? new Car(driverParams.car) : null;
        this._currentLocation = "-";
        this._status = driverParams.status;
        this._emitter = new EventEmitter();
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    isDeleted() {
        return this._isDeleted;
    }

    getSurname() {
        return this._surname;
    }

    toString() {
        return this._name + " " + this._surname;
    }

    getFullName() {
        return this.toString();
    }

    getPhone() {
        return this._phone;
    }

    getStatus() {
        return this._status;
    }

    getDescription() {
        return this._description;
    }

    getCar() {
        if(this._car) return this._car;
    }

    onChange(fn) {
        return this._emitter.subscribe("driverChanged", fn);
    }
}