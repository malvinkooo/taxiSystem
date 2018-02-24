class DriversList {

    constructor() {
        this._drivers = [];
    }

    getAllDrivers() {
        var result = [];
        for(var i=0; i < this._drivers; i++) {
            var driver = this._drivers[i];
            result.push( driver.getInfo() );
        }
        return result;
    }

    getDriver(id) {
        var driver = this._drivers[id];
        return driver.getInfo();
    }

}