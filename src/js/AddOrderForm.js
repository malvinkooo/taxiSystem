class AddOrderForm {
    constructor(addOrderFormElement) {
        this._addOrderFormElement = addOrderFormElement;
        this._addOrderFormElement.tab({
            onVisible: this._onAddOrderTabVisible.bind(this)
        });
        this._selectDropDown = this._addOrderFormElement.find('select.drivers-list');
        this._addOrderFormElement.find('.ui.checkbox').checkbox({
            onChecked: this._onSetDriverAutomaticallyChecked.bind(this),
            onUnchecked: this._onSetDriverAutomaticallyUnchecked.bind(this)
        });
        this._isSetDriverAutomaticallyChecked = false;
        this._addOrderFormElement.find('#addOrderButton').click(this._onAddOrderButtonClick.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    _onAddOrderButtonClick() {
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

    _onSetDriverAutomaticallyChecked() {
        this._isSetDriverAutomaticallyChecked = true;
        this._selectDropDown.closest(".selection").addClass("disabled");
    }

    _onSetDriverAutomaticallyUnchecked() {
        this._isSetDriverAutomaticallyChecked = false;
        this._selectDropDown.closest(".selection").removeClass("disabled");
    }

    _onAddOrderTabVisible() {
        this._selectDropDown.html("");
        var driversList = this._driversController.getFreeDriversList();
        for(var i = 0; i < driversList.length; i++) {
            this._selectDropDown.append("<option value='"
                +driversList[i].getId()+"'>"
                +driversList[i].getFullName()
            +"</optiom>");
        }
        this._selectDropDown.dropdown();
    }
}