class DriversList {

    constructor() {
        this._drivers = {};
        this._lastInsertId = 0;
        this._emitter = new EventEmitter();
    }

    getAllDrivers() {
        return new Promise(function(resolve, reject){
            $.ajax({
                url: '/api/drivers',
                dataType:'json',
                success: function(data) {
                    this._drivers = {};
                    for (var i = 0; i < data.length; i++) {
                        this._drivers[data[i]['id']] = new Driver(data[i]);
                    }
                    resolve(this._drivers);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    }

    addDriver(driverParams) {
        var driver = new Driver(this._lastInsertId, driverParams);
        this._drivers[this._lastInsertId] = driver;
        this._lastInsertId++;
        this._emitter.emit("driverAdded", driver);
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
        this._emitter.emit("driverChanged", driver);
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

    onDriverAdded(fn) {
        return this._emitter.subscribe("driverAdded", fn);
    }

    onDriverChanged(fn) {
        return this._emitter.subscribe("driverChanged", fn);
    }

}