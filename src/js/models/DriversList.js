class DriversList {

    constructor() {
        this._emitter = new EventEmitter();
    }

    getAllDrivers() {
        return new Promise(function(resolve, reject){
            $.ajax({
                url: '/api/drivers',
                type: 'get',
                success: function(data) {
                    var list = [];
                    for (var i = 0; i < data.length; i++) {
                        list.push( new Driver(data[i]) );
                    }
                    resolve(list);
                },
                error: function(error) {
                    console.log(error);
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
        return new Promise(function(resolve, reject){
            $.ajax({
                url: '/api/drivers/' + id,
                type: 'get',
                success: function(data){
                    resolve( new Driver(data) );
                },
                error: function(error){
                    reject(error);
                }
            });
        });
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