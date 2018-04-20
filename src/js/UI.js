class UI {
   constructor() {
       this._mainMenu = new MainMenu($('#mainMenu'));
       this._ordersTab = new OrdersTab($('[data-tab=orders]'));
       this._driversTab = new DriversTab($('.tab[data-tab=drivers]'));
    }

    setOrdersController(ordersController) {
        this._ordersTab.setOrdersController(ordersController);
    }

    setDriversController(driversController) {
        this._mainMenu.setDriversController(driversController);
        this._driversTab.setDriversController(driversController);
    }

    showDriversList(list) {
        this._driversTab.showDriversList(list);
    }

    showDriverInfo(info) {
        this._driversTab.showDriverInfo(info);
    }

    showEditDriverForm(info) {
        this._driversTab.showEditDriverForm(info);

    }

    showSuccessNotification() {
        $('.ui.tab.active form.ui.form').addClass('success');
    }

    showDriverEdirForm (info) {

    }

    showAddOrderForm() {
        //...
    }

    showOrdersList(list) {
        this._ordersTab.showOrdersList(list);
    }

    showOrder(order) {
    	this._ordersTab.showOrder(order);
    }

    showEditOrderForm(order) {
        this._ordersTab.showEditOrderForm(order);
    }

    showAllCars(list) {
        //$('.ui.tab.active').removeClass('active');
        // $('[data-tab=allCars]').addClass('active');
    }

    showCarInfo(info) {
        //...
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