class DisplayCarPopup {
    constructor(displayCarPopupElement) {
        this._displayCarPopupElement = displayCarPopupElement;
    }

    showCar(car) {
        var elements = this._displayCarPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            var getAttr = element.attr("data-getAttr");
            console.log(element);
            element.html(car[getAttr]());
        }
        this._displayCarPopupElement.modal("show");
    }
}