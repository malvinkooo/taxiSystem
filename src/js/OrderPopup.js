class OrderPopup {
    constructor(orderPopupElement) {
        this._orderPopupElement = orderPopupElement;
    }

    showOrderInfo(info) {
        console.log(info);
        this._orderPopupElement.modal("show");
    }
}