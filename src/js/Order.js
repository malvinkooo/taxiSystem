class OrderStatus {

    static get NEW_ORDER() {
        return "Новый";
    }

    static get IN_PROGRESS() {
        return "Выполняется";
    }

    static get COMPLETED() {
        return "Выполнен";
    }

    static get CANCELLED() {
        return "Отменен";
    }
}

class Order {
    constructor(id, orderParams, geoService) {
        this._driver = orderParams.driver;
        this._clientName = orderParams.clientName;
        this._clientPhone = orderParams.clientPhone;
        this._dateOfCreation = new Date();
        this._dateOfCompletion = undefined;
        this._carFeedPoint = orderParams.carFeedPoint;
        this._destination = orderParams.destination;
        this._distance = geoService.getDistance(this._carFeedPoint, this._destination);
        this._rate = orderParams.rate;
        this._id = id;
        this._status = OrderStatus.NEW_ORDER;
    }

    getDriver() {
        return this._driver;
    }

    setDriver(driver) {
        this._driver = driver;
    }

    getDistance() {
        return this._distance;
    }

    getStatus() {
        return this._status;
    }

    setDistance(distance) {
        this._distance = distance;
    }

    setClientname(clientName) {
        this._clientName = clientName;
    }

    setClientPhone(clientPhone) {
        this._clientPhone = clientName;
    }

    setDateOfComplention() {
        this._dateOfCompletion = new Date();
    }

    setCarFeedPoint(carFeedPoint) {
        this._carFeedPoint = carFeedPoint;
    }

    setRate(rate) {
        this._rate = rate;
    }

    getInfo() {
        return {
            clientName: this._clientName,
            clientPhone: this._clientPhone,
            dateOfCreation: this._dateOfCreation,
            dateOfCompletion: this._dateOfCompletion,
            carFeedPoint: this._carFeedPoint,
            destination: this._destination,
            distance: this._distance,
            rate: this._rate,
            status: this._status,
            driver: this._driver
        };
    }

    getDateOfCreation() {
        return this._dateOfCreation;
    }
}