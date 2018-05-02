class AddDriverForm{
    constructor(addDriverFormElement){
        this._addDriverFormElement = addDriverFormElement;
        this._driversController = null;
        this._addDriverFormElement.find(".submit").click(this._onAddDriverFormSubmit.bind(this));
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    _onAddDriverFormSubmit() {
        var driverParams = {};
        var elements = this._addDriverFormElement.find('input, textarea');
        for(var i = 0; i < elements.length; i++) {
            driverParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        this._driversController.addDriver(driverParams);
        this._addDriverFormElement.find("form")[0].reset();
    }
}