$('.main-tabs .item, .secondary.menu .item').tab();

        var ui = new UI();
        var carsList = new CarsList();
        var carsController = new CarsController(ui, carsList);

        $('#addCarForm div.ui.submit.button').click(function() {
            $(this).addClass('disabled');
            var brand = $('#addCarForm input[name=brand]').val();
            var stateCarNumber = $('#addCarForm input[name=stateCarNumber]').val();
            var gasolineConsumptionRatio = $('#addCarForm input[name=gasolineConsumptionRatio]').val();
            carsController.addCar(stateCarNumber, stateCarNumber, gasolineConsumptionRatio);
        });

        var a = {
            'a': 12,
            'b': 3
        };
        for (var c in a) {
            console.log(a[c]);
        }