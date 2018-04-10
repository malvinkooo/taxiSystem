class MainMenu {
    constructor(menuElement) {
        this._menuElement = menuElement;
        this._menuElement.find('.item').tab();
        this._menuElement.find("[data-tab='drivers']").tab({
        	'onLoad': this._onDriversTabLoad.bind(this)
        });
        this._driversController = null;
    }

    setDriversController(driversController){
    	this._driversController = driversController;
    }

    _onDriversTabLoad(){
    	this._driversController.selectMenuItemAllDrivers();
    }
}