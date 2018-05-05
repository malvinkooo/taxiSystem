class AddDriverForm{
    constructor(addDriverFormElement){
        this._addDriverFormElement = addDriverFormElement;
        this._driversController = null;
        this._carsController = null;
        this._selectDropDown = this._addDriverFormElement.find("select.cars-list");
        this._addDriverFormElement.find(".submit").click(this._onAddDriverFormSubmit.bind(this));
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    show() {
        this._selectDropDown.html("");
        var carsList = this._carsController.getCarsList();
        for(var i = 0; i < carsList.length; i++){
            var car = carsList[i];
            this._selectDropDown.append("<option value='"
                +car.getId()+"'>"+car+"</option>");
        }
        this._selectDropDown.dropdown();
    }

    _onAddDriverFormSubmit() {
        var driverParams = {};
        var elements = this._addDriverFormElement.find('input[name], textarea[name], select[name]');
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            driverParams[element.attr('name')] = element.val();
        }
        this._driversController.addDriver(driverParams);
        this._addDriverFormElement.find("form")[0].reset();
    }
}