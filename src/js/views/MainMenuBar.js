class MainMenuBar {

    constructor(htmlMenuBar, ordersController, 
            carsController, driversController, reportsController) {
        this._htmlMenuBar = htmlMenuBar;        
        this._ordersController = ordersController;
        this._carsController = carsController;
        this._driversController = driversController;
        this._reportsController = reportsController;

        this._ordersButton = this._htmlMenuBar.find('[data-tab="orders"]');
        this._carsButton = this._htmlMenuBar.find('[data-tab="cars"]');
        this._driversButton = this._htmlMenuBar.find('[data-tab="drivers"]');
        this._statsButton = this._htmlMenuBar.find('[data-tab="stat"]');

        this._ordersButton.click(this._onOrdersClick.bind(this));
        this._carsButton.click(this._onCarsClick.bind(this));
        this._driversButton.click(this._onDriversClick.bind(this));
        this._statsButton.click(this._onStatsClick.bind(this));
    }    

    _onOrdersClick() {
        this._htmlMenuBar.find('.item').removeClass('active');
        this._ordersButton.addClass('active');
        this._ordersController.selectMenuItemOrders();
    }

    _onCarsClick() {
        this._htmlMenuBar.find('.item').removeClass('active');
        this._carsButton.addClass('active');
        this._carsController.selectMenuItemCars();
    }

    _onDriversClick() {
        this._htmlMenuBar.find('.item').removeClass('active');
        this._driversButton.addClass('active');
        this._driversController.selectMenuItemDrivers();
    }

    _onStatsClick() {
        this._htmlMenuBar.find('.item').removeClass('active');
        this._statsButton.addClass('active');
        this._reportsController.selectMenuItemStatistics();
    }

}