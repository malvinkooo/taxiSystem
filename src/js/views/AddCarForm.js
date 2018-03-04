class AddCarForm {

    constructor(htmlForm, carsController) {
        this._htmlForm = htmlForm;
        this._carsController = carsController;
        this._addButton = this._htmlForm.find('div.ui.submit.button');
        this._brandInput = this._htmlForm.find('input[name=brand]');
        this._stateCarNumberInput = this._htmlForm.find('input[name=stateCarNumber]');
        this._gasolineConsumptionInput = this._htmlForm.find('input[name=gasolineConsumptionRatio]');
        this._addButton.click(this._onAddButtonClick.bind(this));        
    }    

    _onAddButtonClick() {
        this._addButton.addClass('disabled');        
        var brand = this._brandInput.val();
        var stateCarNumber = this._stateCarNumberInput.val();
        var gasolineConsumptionRatio = this._gasolineConsumptionInput.val();
        this._carsController.addCar(stateCarNumber, stateCarNumber, gasolineConsumptionRatio);
    }

}