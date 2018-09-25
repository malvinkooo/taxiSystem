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
        this._id = orderParams.id;
        this._driver = orderParams.driver ? new Driver(orderParams.driver) : null;
        this._client = new Client(orderParams.client);
        this._dateOfCreation = orderParams.dateOfCreation;
        this._dateOfCompletion = "-";
        this._carFeedPoint = new Address(
            orderParams.carFeedPoint.title,
            orderParams.carFeedPoint.lat,
            orderParams.carFeedPoint.lng
        );
        this._destination = new Address(
            orderParams.destination.title,
            orderParams.destination.lat,
            orderParams.destination.lng
        );
        this._distance = orderParams.distance;
        this._rate = orderParams.rate;
        this._status = orderParams.status;
        this._emitter = new EventEmitter();
    }

    getDriver() {
        if(this._driver) return this._driver;
    }

    getClient() {
        return this._client;
    }

    getId() {
        return this._id;
    }

    getDistance() {
        return this._distance;
    }

    getStatus() {
        return this._status;
    }

    getDateOfCompletion() {
        return this._dateOfCompletion;
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

    getDateOfCreation() {
        return this._dateOfCreation;
    }

    onChange(fn) {
        return this._emitter.subscribe("orderChanged", fn);
    }
}