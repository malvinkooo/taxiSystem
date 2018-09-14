class DriversTab {
    constructor(driversTabElement, driversList, carsList) {
        this._driversTabElement = driversTabElement;
        this._driversTabElement.find(".secondary.menu .item").tab({
            onVisible: this._onAddDriverTabLoaded.bind(this)
        });
        this._driversTable = new DriversTable(this._driversTabElement.find('.tab[data-tab="allDrivers"]'), driversList);
        this._addDriverForm = new AddDriverForm(this._driversTabElement.find('.tab[data-tab="addDriver"]'), carsList);
    }

    setDriversController(driversController){
        this._driversTable.setDriversController(driversController);
        this._addDriverForm.setDriversController(driversController);
    }

    setCarsController(carsController) {
        this._driversTable.setCarsController(carsController);
        this._addDriverForm.setCarsController(carsController);
    }

    showDriversList() {
        $.tab('change tab', 'allDrivers');
        this._driversTabElement.find('.item[data-tab="allDrivers"]').trigger('click');
    }

    _onAddDriverTabLoaded(tab) {
        if(tab === 'addDriver') {
            this._addDriverForm.show();
        }
    }
}