class UI {
   constructor(driversList, carsList, ordersList) {
       this._mainMenu = new MainMenu($('#mainMenu'));
       this._ordersTab = new OrdersTab($('.tab[data-tab=orders]'), ordersList);
       this._carsTab = new CarsTab($('.tab[data-tab=cars]'), carsList);
       this._driversTab = new DriversTab($('.tab[data-tab=drivers]'), driversList, carsList);
    }

    setOrdersController(ordersController) {
        this._mainMenu.setOrdersController(ordersController);
        this._ordersTab.setOrdersController(ordersController);
    }

    setCarsController(carsController) {
        this._mainMenu.setCarsController(carsController);
        this._carsTab.setCarsController(carsController);
        this._driversTab.setCarsController(carsController);
    }

    setDriversController(driversController) {
        this._mainMenu.setDriversController(driversController);
        this._ordersTab.setDriversController(driversController);
        this._driversTab.setDriversController(driversController);
    }

    showDriversList() {
        this._driversTab.showDriversList();
    }

    showEditDriverForm(driver) {
        this._driversTab.showEditDriverForm(driver);
    }

    showSuccessNotification() {
        $('.ui.tab.active form.ui.form').addClass('success');
    }

    showOrdersList() {
        this._ordersTab.showOrdersList();
    }

    showCarsList() {
        this._carsTab.showCarsList();
    }

    showStatsPage(driversCount, freeDriversCount, carsCount, ordersCount, ordersInProgressCount) {
        //...
    }

    showReportOptionsForm() {
        //...
    }

    showReport(data) {
        //...
    }
}