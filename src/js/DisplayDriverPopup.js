class DisplayDriverPopup {
    constructor(displayDriverPopupElement) {
        this._displayDriverPopupElement = displayDriverPopupElement;
    }

    showDriverInfo(info) {
        this._displayDriverPopupElement.modal("show");
        console.log(info);
    }
}