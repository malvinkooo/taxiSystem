class DriversList {

    constructor() {
        this._drivers = {};
        this._lastInsertId = 0;
    }

    getAllDrivers() {
        var result = [];
        for (var id in this._drivers) {
            var driver = this._drivers[id];
            result.push( driver.getInfo() );
        }
        return result;
    }

    addDriver(driverParams) {
        var driver = new Driver(this._lastInsertId, driverParams);
        this._drivers[this._lastInsertId] = driver;
        this._lastInsertId++;
    }

    getDriver(id) {
        var driver = this._drivers[id];
        return driver.getInfo();
    }

    editDriver(driverParams) {
    	var driver = this._drivers[driverParams.id];
    	driver.setName(driverParams.name);
    	driver.setSurname(driverParams.surname);
    	driver.setPhone(driverParams.phone);
        driver.setStatus(driverParams.status);
        driver.setCurrentLocation(driverParams.currentLocation);
    	return driver.getInfo();
    }

    deleteDriver(id) {
    	delete this._drivers[id];
    }

    getDriverscount() {
        return Object.keys(this._drivers).length;
    }

    getFreeDriversCount() {
        var freeDriversCount = 0;
        for(var id in this._drivers) {
            var driver = this._drivers[id];
            if(driver.getStatus() === DriverStatus.FREE) {
                freeDriversCount++;
            }
        }
        return freeDriversCount;
    }

    getRandomFreeDriver() {
        var result = [];
        for(var key in this._drivers) {
            var driver = this._drivers[key];
            var driverCurrentStatus = driver.getStatus();
            if(driverCurrentStatus === DriverStatus.FREE) {
                result.push(driver);
            }
        }
        var rand = Math.floor(Math.random() * result.length);
        return result[rand];
    }

}