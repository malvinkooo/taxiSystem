class UI {
   constructor() {
       this._mainMenu = new MainMenu($('#mainMenu'));
       this._ordersTab = new OrdersTab($('[data-tab=orders]'));
    }

    setOrdersController(ordersController) {
        this._ordersTab.setOrdersController(ordersController);
    }

    showDriversList(list) {
        // display data in DOM
    }

    showDriverInfo(info) {
        // display driver info via DOM
    }

    showAddDriverForm() {

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

    showOrderInfo(info) {
    	this._ordersTab.showOrderInfo(info);
    }

    showOrderEditForm(info) {
    	//показать попап для редактирования заказа
    }

    showAllCars(list) {
        console.log(list);
        //$('.ui.tab.active').removeClass('active');
        $('[data-tab=allCars]').addClass('active');
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