class UI {

   constructor(ordersController, carsController, driversController, reportController) {
       var htmlAddCarForm = $('#addCarForm');
       var htmlMenuBar = $('#mainMenu');

       this._mainMenu = new MainMenuBar(htmlMenuBar, ordersController, 
            carsController, driversController, reportController);

       this._addCarForm = new AddCarForm(htmlAddCarForm, carsController);
       this._activeView = null;
   }

    showMenuCars() {
        
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
        this._activeView.showSuccessNotification();        
    }

    showDriverEdirForm (info) {

    }

    showAddOrderForm() {

    }

    showOrdersList(list) {
        // display data in DOM
    }

    showOrderInfo(info) {
    	//...
    }

    showOrderEditForm(info) {
    	//..
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