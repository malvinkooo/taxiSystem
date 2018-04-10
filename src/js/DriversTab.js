class DriversTab {
    constructor(driversTabElement) {
        this._driversTabElement = driversTabElement;
        this._driversTabElement.find(".secondary.menu .item").tab();
        this._driversTable = new DriversTable(this._driversTabElement.find('.tab[data-tab="allDrivers"]'));
        this._addDriverForm = new AddDriverForm(this._driversTabElement.find('.tab[data-tab="addDriver"]'));
    }

    setDriversController(driversController){
        this._addDriverForm.setDriversController(driversController);
    }

    showDriversList(list) {
        $.tab('change tab', 'allDrivers');
        this._driversTabElement.find('.item[data-tab="allDrivers"]').trigger('click');
        this._driversTable.showDriversList(list);
    }
}