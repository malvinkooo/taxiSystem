class DriversController {
    constructor(ui, driversList) {
        this._ui = ui;
        this._driversList = driversList;
    }

    selectMenuItemAllDrivers() {
        var list = this._driversList.getAllDrivers();
        this._ui.showDriversList(list);
    }

    selectDriver(id) {
        var driver = this._driversList.getDriver(id);
        this._ui.showDriver(driver);
    }

    selectMenuItemAddDriver() {
        this._ui.showAddDriverForm();
    }

/**
 *
 * 1. Пользователь выбирает пункт меню "Поиск"
 * 2. Система отображает форму поиска (что искать и по какому шаблону  / поисковой фразе).
 * 3. Пользователь выбирает критерий поиска: "поиск по водителям, по машинам, по заказам"
 * 4. Пользователь ставит курсор в строку поиска.
 * 5. Пользователь вводит поисковую фразу.
 * 6. Пользователь нажимает кнопку "Найти".
 * 7. Система выполняет поиск заданного типа по данному шаблону.
 * 8. Система отображает список найденных объектов
 * 9. Система переходит в режим ожидания действий пользователя.
 *
 * selectMenuItemSearch() - > Controller
 * showSearchForm() -> UI
 * performSearch(searchType, pattern) -> Controller
 *      showDriversList(list) -> UI
 *      showCarsList(list) -> UI
 *      showOrdersList(list) -> UI
 *
 */

    addDriver(driverParams){
        this._driversList.addDriver(driverParams);
        var list = this._driversList.getAllDrivers();
        this._ui.showDriversList(list);
    }

    selectEditDriver(id) {
        var order = this._driversList.getDriver(id);
        this._ui.showEditDriverForm(order);
    }

    editDriver(driverParams) {
        var driver = this._driversList.editDriver(driverParams);
        this._ui.showDriver(driver);
    }

    selectDeleteDriver(id) {
        this._driversList.deleteDriver(id);
        var list = this._driversList.getAllDrivers();
        this._ui.showDriversList(list);
    }
}