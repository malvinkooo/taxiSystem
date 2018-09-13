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
                    var errorInfo = {};
                    if(error.responseJSON) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке получить список водителей.';
                    }
                    reject(errorInfo);
                }
            });
        });
    }

    addDriver(driverParams) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/api/drivers",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify(driverParams),
                success: data => {
                    var driver = new Driver(data);
                    this._emitter.emit('driverAdded', driver);
                    resolve(driver);
                },
                error: error => {
                    var errorInfo = {};
                    if(error.responseJSON) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке добавить нового водителя в систему.';
                    }
                    reject(errorInfo);
                }
            });
        });
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
                    console.log(error);
                    var errorInfo = {};
                    if(error.responseJSON) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке получить информацию о водителе.';
                    }
                    reject(errorInfo);
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
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/drivers/' + id,
                type: 'delete',
                success: data => {
                    this._emitter.emit("driverRemoved");
                    resolve();
                },
                error: error => {
                    var errorInfo = {};
                    if(errorInfo.responseJSON) {
                        errorInfo = errorInfo.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке удалить водителя из системы.';
                    }
                }
            });
        });
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