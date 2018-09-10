class OrderStatus {

    static get NEW_ORDER() {
        return 'Новый';
    }

    static get IN_PROGRESS() {
        return 'Выполняется';
    }

    static get COMPLETED() {
        return 'Выполнен';
    }

    static get CANCELLED() {
        return 'Отменен';
    }

    static get statusList() {
        return [
            'Новый',
            'Выполняется',
            'Выполнен',
            'Отменен'
        ];
    }

    static get colorsList() {
        return {
            'Новый': 'green',
            'Выполняется': 'orange',
            'Выполнен': 'blue',
            'Отменен': 'grey'
        };
    }
}

class Order {
    constructor(orderParams) {
        // console.log(orderParams);
        this._driver = new Driver(orderParams.driver);
        this._clientName = orderParams.clientName;
        this._clientPhone = orderParams.clientPhone;
        this._dateOfCreation = new Date();
        this._dateOfCompletion = "-";
        this._carFeedPoint = orderParams.carFeedPoint;
        this._destination = orderParams.destination;
        this._distance = orderParams.distance;
        this._rate = orderParams.rate;
        this._id = orderParams.id;
        this._status = orderParams.status;
        this._emitter = new EventEmitter();
    }

    getDriver() {
        return this._driver;
    }

    setDriver(driver) {
        this._driver = driver;
        this._emitter.emit("orderChanged");
    }

    getId() {
        return this._id;
    }

    getDistance() {
        return this._distance;
    }

    setDistance(distance) {
        this._distance = distance;
        this._emitter.emit("orderChanged");
    }

    getStatus() {
        return this._status;
    }

    setStatus(status) {
        this._status = status;
        this._emitter.emit("orderChanged");
    }

    getClientName() {
        return this._clientName;
    }

    setClientName(clientName) {
        this._clientName = clientName;
        this._emitter.emit("orderChanged");
    }

    getClientPhone() {
        return this._clientPhone;
    }

    setClientPhone(clientPhone) {
        this._clientPhone = clientPhone;
        this._emitter.emit("orderChanged");
    }

    getDateOfCompletion() {
        return this._dateOfCompletion;
    }

    setDateOfComplention(dateOfCompletion) {
        this._dateOfCompletion = dateOfCompletion;
        this._emitter.emit("orderChanged");
    }

    getCarFeedPoint() {
        return this._carFeedPoint;
    }

    setCarFeedPoint(carFeedPoint) {
        this._carFeedPoint = carFeedPoint;
        this._emitter.emit("orderChanged");
    }

    getDestination() {
        return this._destination;
    }

    setDestination(destination) {
        this._destination = destination;
        this._emitter.emit("orderChanged");
    }

    getRate() {
        return this._rate;
    }

    setRate(rate) {
        this._rate = rate;
        this._emitter.emit("orderChanged");
    }

    getDateOfCreation() {
        return this._dateOfCreation;
    }

    onChange(fn) {
        return this._emitter.subscribe("orderChanged", fn);
    }
}