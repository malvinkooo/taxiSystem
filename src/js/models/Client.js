class Client {

    constructor(params) {
        this._id = params.id;
        this._name = params.name;
        this._surname = params.surname;
        this._phone = params.phone;
    }

    toString() {
        return this._name + " " + this._surname;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getSurname() {
        return this._surname;
    }

    getPhone() {
        return this._phone;
    }

}