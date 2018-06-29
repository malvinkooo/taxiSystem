class CarsTable {
   constructor(carsTableElement, carsList) {
      this._carsTableElement = carsTableElement;
      this._carsList = carsList;
      this._tbody = this._carsTableElement.find("table tbody");

      this._carsList.onCarAdded(this._carAdded.bind(this));
      this._carsList.onCarChanged(this._carChanged.bind(this));

      this._tbody.on("click", "tr", this._onCarRowClick.bind(this));
      this._displayCarPopup = new DisplayCarPopup(this._carsTableElement.find(".displayCarModal"));
      this._editCarPopup = new EditCarPopup(this._carsTableElement.find(".editCarModal"));
   }

   setCarsController(carsController) {
      this._carsController = carsController;
      this._displayCarPopup.setCarsController(carsController);
      this._editCarPopup.setCarsController(carsController);
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
      this._displayCarPopup.showCar(car);
   }

   showEditCarForm(car) {
      this._editCarPopup.showEditCarForm(car);
   }

   _onCarRowClick(e) {
      var carId = e.currentTarget.dataset.carId;
      this._carsController.selectCar(carId);
   }

   _carAdded() {
      console.log("Car has been added");
      this._showCarsList();
      //
   }

   _carChanged() {
      console.log("Car has been changed");
      this._showCarsList();
      //
   }
}