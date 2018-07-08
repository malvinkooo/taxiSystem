class CarsTable {
   constructor(carsTableElement, carsList) {
      this._carsTableElement = carsTableElement;
      this._carsList = carsList;
      this._tbody = this._carsTableElement.find("table tbody");
      this._carsList.onCarAdded(this._carAdded.bind(this));
      this._carsList.onCarChanged(this._carChanged.bind(this));
      this._tbody.on("click", "tr", this._onCarRowClick.bind(this));
   }

   setCarsController(carsController) {
      this._carsController = carsController;
   }

   _showCarsList() {
      var list = this._carsList.getAllCars();
      this._tbody.html("");
      for(var i = 0; i < list.length; i++) {
         var car = list[i];
         this._tbody.append("<tr data-car-id='"+car.getId()+"'><td>"
            +car.getBrand()+"</td><td>"
            +car.getGasolineConsumptionRatio()+"</td><td>"
            +car.getStateCarNumber()
         +"</td></tr>");
      }
   }

   showCar(car) {
      var popup = new DisplayCarPopup();
      popup.setCarsController(carsController);
      popup.showCar(car);
   }

   _onCarRowClick(e) {
      var carId = e.currentTarget.dataset.carId;
      var car = this._carsList.getCar(carId);
      this.showCar(car);
   }

   _carAdded() {
      this._showCarsList();
   }

   _carChanged() {
      this._showCarsList();
   }
}