class CarsTable {
   constructor(carsTableElement) {
      this._carsTableElement = carsTableElement;
      this._tbody = this._carsTableElement.find("table tbody");
   }

   showCarsList(list) {
      console.log(list);
      this._tbody.html();
      for(var i = 0; i < list.length; i++) {
         var car = list[i];
         console.log(car);
         this._tbody.html("<tr data-car-id='"+car.getId()+"'><td>"
            +car.getBrand()+"</td><td>"
            +car.getGasolineConsumptionRation()+"</td><td>"
            +car.getStateCarNumber()
         +"</td></tr>");
      }
   }
}