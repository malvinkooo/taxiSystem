class EditCarPopup {
    constructor(options) {
        if (options) {
            this._onAccept = options.onAccept || null;
            this._onReject = options.onReject || null;
            this._onClosed = options.onClosed || null;
        }
        $($("#editCarPopup").html()).appendTo('body');
        this._editCarPopupElement = $(".editCarModal");
        this._carsController = null;
        this._lastCarId = null;
        this._cleanHTML = true;
        this._editCarFormConstraints = Validation.getCarConstraints();
        this._editCarPopupElement.modal({
            onApprove: () => {
                return this._onEditFormSubmit();
            },
            onHide: () => {
                this._cleanHTML = true;
            },
            onHidden: () => {
                if(this._cleanHTML) {
                    this._onClosed();
                    $(".editCarModal").remove();
                }
            }
        });
    }

    setCarsController(carsController) {
        this._carsController = carsController;
    }

    show(car) {
        this._cleanHTML = false;
        this._lastCarId = car.getId();
        var elements = this._editCarPopupElement.find("[data-getAttr]");
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            var getAttr = element.attr("data-getAttr");
            element.val(car[getAttr]());
        }
        this._editCarPopupElement.find("[data-getAttr='getId']").html(car.getId());
        this._editCarPopupElement.modal("show");
    }

    _onEditFormSubmit() {
        var carParams = {};
        carParams["id"] = this._lastCarId;
        var elements = this._editCarPopupElement.find("input, textarea");
        for(var i = 0; i < elements.length; i++) {
            var element = $(elements[i]);
            carParams[element.attr("name")] = element.val();
        }
        var errors = validate(carParams, this._editCarFormConstraints);
        for(var k = 0; k < elements.length; k++) {
            var field = $(elements[k]).closest(".field");
            field.removeClass("has-error");
            field.find(".help-error").remove();
            if(errors) {
                var errorsInput = errors[$(elements[k]).attr("name")];
                if(errorsInput) {
                    field.addClass("has-error").append("<p class='help-error'>"+errorsInput+"</p>");
                }
            }
        }
        if(!errors) {
            this._carsController.editCar(carParams)
                // .then(car => console.log(car))
                .catch(error => {
                    console.log(error.code);
                    console.log(error.message);
                });

            this._editCarPopupElement.find("form")[0].reset();
            this._cleanHTML = true;
        } else {
            return false;
        }
    }
}