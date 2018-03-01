class ReportsController {

    constructor(drivers, cars, orders, ui, reportGenerator, reportWriter) {
        this._drivers = drivers;
        this._cars = cars;
        this._orders = orders;
        this._ui = ui;
        this._reportGenerator = reportGenerator;
    }

    selectMenuItemstatistics() {
        var driversCount = this._drivers.getDriverscount();
        var freeDriversCount = this._drivers.getFreeDriversCount();
        var carsCount = this._cars.getCarsCount();
        var ordersCount = this._orders.getOrdersCount();
        var ordersInProgressCount = this._orders.getOrdersInProgressCount();
        this._ui.showStatsPage(driversCount, freeDriversCount, carsCount, ordersCount, ordersInProgressCount);
        this._ui.showReportOptionsForm();
    }

    generateReport(type, startDate, endDate) {
        var orders = this._orders.getOrdersByCreationDate(startDate, endDate);
        var data = this._reportGenerator.generateReport(orders);
        this._ui.showReport(data);
    }

    saveReport(data) {
        this._reportWriter.saveReport(data);
    }
}