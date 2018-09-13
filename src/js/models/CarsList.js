class CarsList {

    constructor() {
        this._emitter = new EventEmitter();
    }

    getAllCars() {
        return new Promise(function(resolve, reject){
            $.ajax({
                url: '/api/cars',
                type: 'get',
                success: function(data) {
                    var list = [];
                    for (var i = 0; i < data.length; i++) {
                        list.push( new Car(data[i]) );
                    }
                    resolve(list);
                },
                error: function(error) {
                    var errorInfo = {};
                    if(error.responseText) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке получить список машин.';
                    }
                    reject(errorInfo);
                }
            });
        });
    }

    addCar(carParams) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/cars',
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify(carParams),
                success: data => {
                    var car = new Car(data);
                    this._emitter.emit("carAdded", car);
                    resolve(car);
                },
                error: error => {
                    var errorInfo = {};
                    if(error.responseText) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке добавить новую машину в систему.';
                    }
                    reject(errorInfo);
                }
            });
        });
    }

    getCar(id) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: '/api/cars/' + id,
                type: 'get',
                success: function(data) {
                    var car = new Car(data);
                    resolve( car );
                },
                error: function(error) {
                    var errorInfo = {};
                    if(error.responseText) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке получить информацию о машине.';
                    }
                    reject(errorInfo);
                }
            });
        });
    }

    editCar(carParams) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/cars/' + carParams.id,
                type: 'put',
                contentType: "application/json",
                data: JSON.stringify(carParams),
                success: data => {
                    var car = new Car(data);
                    this._emitter.emit("carChanged", car);
                    resolve( car );
                },
                error: function(error) {
                    var errorInfo = {};
                    if(error.responseText) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке отредактировать информацию о машине.';
                    }
                    reject(errorInfo);
                }
            });
        });
    }

    deleteCar(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/cars/' + id,
                type: 'delete',
                success: data => {
                    this._emitter.emit("carRemoved");
                    resolve();
                },
                error: error => {
                    var errorInfo = {};
                    if(error.responseText) {
                        errorInfo = error.responseJSON;
                    } else {
                        errorInfo['code'] = error.status;
                        errorInfo['message'] = 'Ошибка при попытке удалить машину из системы.';
                    }
                    reject(errorInfo);
                }
            });
        });

    }

    getCarsCount() {
        return Object.keys(this._cars).length;
    }

    onCarAdded(fn) {
        this._emitter.subscribe("carAdded", fn);
    }

    onCarChanged(fn) {
        this._emitter.subscribe("carChanged", fn);
    }

    onCarRemoved(fn) {
        this._emitter.subscribe("carRemoved", fn);
    }
}