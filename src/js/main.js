class UI {
   constructor() {

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