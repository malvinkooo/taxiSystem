class CarsTable {
   constructor(carsTableElement, carsList) {
      this._carsTableElement = carsTableElement;
      this._carsList = carsList;
      this._tbody = this._carsTableElement.find("table tbody");
      this._carsList.onCarAdded(this._carAdded.bind(this));
      this._carsList.onCarChanged(this._carChanged.bind(this));
      this._carsList.onCarRemoved(this._carRemoved.bind(this));
      this._tbody.on("click", "tr", this._onCarRowClick.bind(this));

      this._showCarsList();
   }


   setCarsController(carsController) {
      this._carsController = carsController;
   }

   _showCarsList() {
      this._carsList.getAllCars()
         .then(list => {
            this._tbody.html("");
            for(var i = 0; i < list.length; i++) {
               var car = list[i];
               this._tbody.append("<tr data-car-id='"+car.getId()+ "'"
                  +(car.isDeleted() ? 'class="disabled"' : '')+"'><td>"
                  +car.getBrand()+"</td><td>"
                  +car.getGasolineConsumptionRatio()+"</td><td>"
                  +car.getStateCarNumber()
                  +"</td></tr>");
            }
         }).catch(error => {
            console.log(error.code);
            console.log(error.message);
         });
   }

   showCar(car) {
      var popup = new DisplayCarPopup(this._carsList);
      popup.setCarsController(carsController);
      popup.showCar(car);
   }

   _onCarRowClick(e) {
      var carId = e.currentTarget.dataset.carId;
      this._carsList.getCar(carId)
         .then(car => this.showCar(car))
         .catch(error => {
            console.log(error);
            console.log(error.code);
            console.log(error.message);
         });
   }

   _carAdded() {
      this._showCarsList();
   }

   _carChanged() {
      this._showCarsList();
   }

   _carRemoved() {
      this._showCarsList();
   }
}