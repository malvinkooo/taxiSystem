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

    addDriver(name, surname, phone) {
    		var driver = new Driver(name, surname, phone);
        this._drivers.push(driver);
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
    	//delete
    }

}