class CarsTable {
   constructor(carsTableElement) {
      this._carsTableElement = carsTableElement;
      this._tbody = this._carsTableElement.find("table tbody");
      this._tbody.on("click", "tr", this._onCarRowClick.bind(this));
      this._displayCarPopup = new DisplayCarPopup(this._carsTableElement.find(".displayCarModal"));
      this._editCarPopup = new EditCarPopup(this._carsTableElement.find(".editCarModal"));
   }

   setCarsController(carsController) {
      this._carsController = carsController;
      this._displayCarPopup.setCarsController(carsController);
      this._editCarPopup.setCarsController(carsController);
   }

   showCarsList(list) {
      this._tbody.html("");
      for(var i = 0; i < list.length; i++) {
         var car = list[i];
         this._tbody.html("<tr data-car-id='"+car.getId()+"'><td>"
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
}