class Order {
    constructor(orderParams) {
        this._geoService = geoService;
        this._clientName = orderParams.clientName;
        this._clientPhone = orderParams.clientPhone;
        this._dateOfCreation = new Date();
        this._dateOfCompletion = undefined;
        this._carFeedPoint = orderParams.carFeedPoint;
        this._destination = orderParams.destination;
        this._distance = undefined;
        this._rate = orderParams.rate;
        this._id = orderParams.id;
    }

    getDistance(startPosition, endPosition) {
        return geoService.getDistance(this._carFeedPoint, this._destination);
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
            rate: this._rate
        };
    }
}