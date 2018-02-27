class DriversList {

    constructor() {
        this._drivers = {};
        this._lastInsertId = 0;
    }

    getAllDrivers() {
        var result = [];
        for (var id in this._drivers) {
            //почему нельзя перебирать не включи а сразу водителей?
            var driver = this._drivers[id];
            result.push( driver.getInfo() );
        }
        return result;
    }

    addDriver(name, surname, phone) {
        var driver = new Driver(this._lastInsertId, name, surname, phone);
        this._drivers[this._lastInsertId] = driver;
        this._lastInsertId++;
    }

    getDriver(id) {
        var driver = this._drivers[id];
        return driver.getInfo();
    }

    editDriver(id, name, surname, phone) {
    	var driver = this._drivers[id];
    	driver.setName(name);
    	driver.setSurname(surname);
    	driver.setPhone(phone);
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
                freeDriversCount++:
            }
        }
        return freeDriversCount;
    }

}