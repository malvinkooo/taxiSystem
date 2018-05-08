class AddOrderForm {
    constructor(addOrderFormElement) {
        this._addOrderFormElement = addOrderFormElement;
        this._selectDropDown = this._addOrderFormElement.find('select.drivers-list');
        this._addOrderFormElement.find('.ui.checkbox').checkbox({
            onChecked: this._onSetDriverAutomaticallyChecked.bind(this),
            onUnchecked: this._onSetDriverAutomaticallyUnchecked.bind(this)
        });
        this._carFeedPointSearch = this._addOrderFormElement.find(".search.carFeedPoint");
        this._carFeedPointSearch.search({
            apiSettings: {
              onResponse: function(openstreetmapResponse){
                var response = {
                    results: []
                };
                $.each(openstreetmapResponse, function(index, item){
                    if(item.address.road && item.address.house_number){
                        response.results.push({
                            title: item.address.road + ", " + item.address.house_number,
                            desciption: item.display_name
                        });
                    }
                });
                return response;
              },
              url: 'https://nominatim.openstreetmap.org/search?&addressdetails=1&format=json&q={query}'
              // url: 'https://api.github.com/search/repositories?q={query}'
            },
            fields: {
              results: 'results',
              title: 'title',
              description: "description",
              url: false
            },
            minCharacters : 3,
            onResults: function(results) {
                console.log(results);
            }
        });
        this._isSetDriverAutomaticallyChecked = false;
        this._addOrderFormElement.find('.submit').click(this._onAddOrderFormSubmit.bind(this));
    }

    setOrdersController(ordersController) {
        this._ordersController = ordersController;
    }

    setDriversController(driversController) {
        this._driversController = driversController;
    }

    _onAddOrderFormSubmit() {
        var orderParams = {};
        var elements = this._addOrderFormElement.find('input, select');
        for(var i=0; i < elements.length; i++) {
            orderParams[$(elements[i]).attr('name')] = $(elements[i]).val();
        }
        orderParams.isSetDriverAutomatically = this._isSetDriverAutomaticallyChecked;
        this._ordersController.addOrder(orderParams);
        this._addOrderFormElement.find('form')[0].reset();
        return false;
    }

    show() {
        this._selectDropDown.html("");
        var driversList = this._driversController.getDriversList();
        for(var i = 0; i < driversList.length; i++) {
            var driver = driversList[i];
            this._selectDropDown.append("<option value='"
                +driver.getId()+"'>"
                +driver.getFullName()
            +"</option>");
        }
        this._selectDropDown.dropdown();
    }

    _onSetDriverAutomaticallyChecked() {
        this._isSetDriverAutomaticallyChecked = true;
        this._selectDropDown.closest(".selection").addClass("disabled");
    }

    _onSetDriverAutomaticallyUnchecked() {
        this._isSetDriverAutomaticallyChecked = false;
        this._selectDropDown.closest(".selection").removeClass("disabled");
    }
}