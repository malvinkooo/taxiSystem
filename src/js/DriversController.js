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
        var info = this._driversList.getDriver(id);
        this._ui.showDriverInfo(info);
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

    addDriver(name, surname, phone){
        this._driversList.addDriver(name, surname, phone);
        this._ui.showSuccessNotification();
        var list = this._driversList.getAllDrivers();
        this._ui.showDriversList(list);
    }

    selectEditDriver(id) {
        var info = this._driversList.getDriver(id);
        this._ui.showDriverEdirForm(info);
    }

    editDriver(id, name, surname, phone) {
        var info = this._driversList.editDriver(id, name, surname, phone);
        this._ui.showSuccessNotification();
        this._ui.shorDriverInfo(info);
    }

    selectDeleteDriver(id) {
        this._driversList.deleteDriver(id);
        this._ui.showSuccessNotification();
        var list = this._driversList.getAllDrivers();
        this._ui.showDriversList(list);
    }
}