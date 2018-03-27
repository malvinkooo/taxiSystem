class AddOrderForm {
    constructor(addOrderFormElement) {
        this._addOrderFormElement = addOrderFormElement;
        this._addOrderFormElement.find('select.dropdown').dropdown();
        this._addOrderFormElement.find('.ui.checkbox').checkbox();
        this._addOrderFormElement.find('#addOrderButton').click(this._onAddOrderButtonClick.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    _onAddOrderButtonClick() {
        var orderParams = {};
        var elements = this._addOrderFormElement.find('input, select');
        for(var i=0; i < elements.length; i++) {
            orderParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        this._ordersController.addOrder(orderParams);
        this._addOrderFormElement.find('form')[0].reset();
        return false;
    }

}