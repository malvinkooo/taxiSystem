class EditOrderPopup {
    constructor(editOrderPopupElement) {
        this._editOrderPopupElement = editOrderPopupElement;
        this._editOrderPopupElement.find('select.dropdown').dropdown();
        this._editOrderPopupElement.find(".submit").click(this._onEditFormSubmit.bind(this));
    }

    showEditOrderForm(info) {
        console.log(info);
        for(var key in info) {
            this._editOrderPopupElement.find(".order-"+key+"").val(info[key]);
        }
        this._editOrderPopupElement.find(".order-id").html(info['id']);
        this._editOrderPopupElement.find(".order-status").html(info['status']);
        this._editOrderPopupElement.find(".order-driver").html(info['driver']);
        this._editOrderPopupElement.modal("show");
    }

    _onEditFormSubmit() {
        var inputs = this._editOrderPopupElement.find("input");
        console.log(inputs);
    }
}