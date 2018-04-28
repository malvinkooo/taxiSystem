class AddDriverForm{
    constructor(addDriverFormElement){
        this._addDriverFormElement = addDriverFormElement;
        this._driversController = null;
        this._addDriverFormElement.find("#addDriverButton").click(this._onAddDriverButtonClick.bind(this));
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    _onAddDriverButtonClick() {
        var driverParams = {};
        var elements = this._addDriverFormElement.find('input, textarea');
        for(var i = 0; i < elements.length; i++) {
            driverParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        this._driversController.addDriver(driverParams);
        this._addDriverFormElement.find("form")[0].reset();
    }
}