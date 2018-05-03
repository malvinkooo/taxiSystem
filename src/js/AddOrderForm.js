class AddOrderForm {
    constructor(addOrderFormElement) {
        this._addOrderFormElement = addOrderFormElement;
        this._selectDropDown = this._addOrderFormElement.find('select.drivers-list');
        this._addOrderFormElement.find('.ui.checkbox').checkbox({
            onChecked: this._onSetDriverAutomaticallyChecked.bind(this),
            onUnchecked: this._onSetDriverAutomaticallyUnchecked.bind(this)
        });
        this._isSetDriverAutomaticallyChecked = false;
        this._addOrderFormElement.find('.submit').click(this._onAddOrderFormSubmit.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    _onAddOrderFormSubmit() {
        var orderParams = {};
        var elements = this._addOrderFormElement.find('input, select');
        for(var i=0; i < elements.length; i++) {
            orderParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        orderParams.isSetDriverAutomatically = this._isSetDriverAutomaticallyChecked;
        this._ordersController.addOrder(orderParams);
        this._addOrderFormElement.find('form')[0].reset();
        return false;
    }

    show() {
        this._selectDropDown.html("");
        var driversList = this._driversController.getDriversList();
        for(var i = 0; i < driversList.length; i++) {
            var driver = driversList[i];
            this._selectDropDown.append("<option value='"
                +driver.getId()+"'>"
                +driver.getFullName()
            +"</option>");
        }
        this._selectDropDown.dropdown();
    }

    _onSetDriverAutomaticallyChecked() {
        this._isSetDriverAutomaticallyChecked = true;
        this._selectDropDown.closest(".selection").addClass("disabled");
    }

    _onSetDriverAutomaticallyUnchecked() {
        this._isSetDriverAutomaticallyChecked = false;
        this._selectDropDown.closest(".selection").removeClass("disabled");
    }
}