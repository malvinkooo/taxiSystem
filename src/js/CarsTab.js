class CarsTab {

    constructor(carsTabElement){
        this._carsTabElement = carsTabElement;
        this._carsTabElement.find('.secondary.menu .item').tab();
        this._carsTable = new CarsTable(this._carsTabElement.find(".tab[data-tab='allCars']"));
    }

    setCarsController(carsController) {
        this._carsTable.setCarsController(carsController);
    }

    showCarsList(list) {
        $.tab('change tab', 'allCars');
        this._carsTabElement.find('[data-tab="allCars"]').trigger('click');
        this._carsTable.showCarsList(list);
    }

    showCar(car) {
        this._carsTable.showCar(car);
    }
}