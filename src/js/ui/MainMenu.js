class MainMenu {
    constructor(menuElement) {
        this._menuElement = menuElement;
        this._menuElement.find('.item').tab({
            'onLoad': (function(tab) {
                switch(tab) {
                    case 'orders':
                        this._onOrdersTabLoad();
                    break;

                    case 'cars':
                        this._onCarsTabLoad();
                    break;

                    case 'drivers':
                        this._onDriversTabLoad();
                    break;
                }
            }).bind(this)
        });
        this._driversController = null;
    }

    setDriversController(driversController){
    	this._driversController = driversController;
    }

    setCarsController() {
        this._carsController = carsController;
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    _onOrdersTabLoad() {
        this._ordersController.selectMenuItemAllOrders();
    }

    _onCarsTabLoad() {
        this._carsController.selectMenuItemAllCars();
    }

    _onDriversTabLoad(){
    	this._driversController.selectMenuItemAllDrivers();
    }
}