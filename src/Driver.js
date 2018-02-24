class DriverStatus {

    static get ABSENT() {
        return 0;
    }

    static get FREE() {
        return 1;
    }

    static get BUSY() {
        return 2;
    }    
}


class Driver {
    constructor(id, name, surname, phone) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._phone = phone;
        this._currentLocation = undefined;
        this._status = DriverStatus.FREE;
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    //....

    getInfo() {
        return {
            name: this._name,
            surname: this._surname,
            phone: this._phone,
            currentLocation: this._currentLocation,
            status: this._status
        };
    }
}