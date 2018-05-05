class DriversList {

    constructor() {
        this._drivers = {};
        this._lastInsertId = 0;
    }

    getAllDrivers() {
        var list = [];
        for (var id in this._drivers) {
            list.push(this._drivers[id]);
        }
        return list;
    }

    addDriver(driverParams) {
        var driver = new Driver(this._lastInsertId, driverParams);
        this._drivers[this._lastInsertId] = driver;
        this._lastInsertId++;
    }

    getDriver(id) {
        return this._drivers[id];
    }

    editDriver(driverParams) {
        var driver = this._drivers[driverParams.id];
        driver.setName(driverParams.name);
        driver.setSurname(driverParams.surname);
        driver.setPhone(driverParams.phone);
        driver.setStatus(driverParams.status);
        driver.setCurrentLocation(driverParams.currentLocation);
        driver.setDescription(driverParams.description);
        driver.setCar(driverParams.car);
        return driver;
    }

    deleteDriver(id) {
        delete this._drivers[id];
    }

    getDriverscount() {
        return Object.keys(this._drivers).length;
    }

    getFreeDrivers() {
        var list = [];
        for(var id in this._drivers) {
            var driver = this._drivers[id];
            if(driver.getStatus() === DriverStatus.FREE) {
                list.push(driver);
            }
        }
        return list;
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