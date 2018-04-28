class MainMenu {
    constructor(menuElement) {
        this._menuElement = menuElement;
        this._menuElement.find('.item').tab();
        this._menuElement.find(".item[data-tab='drivers']").tab({
        	'onLoad': this._onDriversTabLoad.bind(this)
        });
        this._menuElement.find(".item[data-tab='orders']").tab({
            'onLoad': this._onOrdersTabLoad.bind(this)
        });
        this._driversController = null;
    }

    setDriversController(driversController){
    	this._driversController = driversController;
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    _onDriversTabLoad(){
    	this._driversController.selectMenuItemAllDrivers();
    }

    _onOrdersTabLoad() {
        this._ordersController.selectMenuItemAllOrders();
    }
}