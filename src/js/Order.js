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
    constructor(id, orderParams, geoService) {
        this._driver = orderParams.driver;
        this._clientName = orderParams.clientName;
        this._clientPhone = orderParams.clientPhone;
        this._dateOfCreation = new Date();
        this._dateOfCompletion = "-";
        this._carFeedPoint = orderParams.carFeedPoint;
        this._destination = orderParams.destination;
        this._distance = geoService.getDistance(this._carFeedPoint, this._destination);
        this._rate = orderParams.rate;
        this._id = id;
        this._status = OrderStatus.NEW_ORDER;
    }

    setDriver(driver) {
        this._driver = driver;
    }

    getId() {
        return this._id;
    }

    getDistance() {
        return this._distance;
    }

    setDistance(distance) {
        this._distance = distance;
    }

    getStatus() {
        return this._status;
    }

    setStatus(status) {
        this._status = status;
    }

    getClientName() {
        return this._clientName;
    }

    setClientName(clientName) {
        this._clientName = clientName;
    }

    getClientPhone() {
        return this._clientPhone;
    }

    setClientPhone(clientPhone) {
        this._clientPhone = clientPhone;
    }

    getDateOfCompletion() {
        return this._dateOfCompletion;
    }

    setDateOfComplention(dateOfCompletion) {
        this._dateOfCompletion = dateOfCompletion;
    }

    getCarFeedPoint() {
        return this._carFeedPoint;
    }

    setCarFeedPoint(carFeedPoint) {
        this._carFeedPoint = carFeedPoint;
    }

    getDestination() {
        return this._destination;
    }

    setDestination(destination) {
        this._destination = destination;
    }

    getRate() {
        return this._rate;
    }

    setRate(rate) {
        this._rate = rate;
    }

    getDateOfCreation() {
        return this._dateOfCreation;
    }
}