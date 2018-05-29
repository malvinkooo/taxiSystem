class SearchBox {
    constructor(searchElement) {
        this._searchSettings = {
            apiSettings: {
              responseAsync: function(settings, callback){
                GeoService.getAddressHint(settings.urlData.query)
                    .then(callback)
                    .catch((err) => {
                      console.log(err);
                    });
              },
            },
            fields: {
              results: 'results',
              title: 'title',
              description: 'description',
              url: false
            },
            minCharacters : 3,
            onSelect: (result) => {
              var address =  new Address(result.title, result.lat, result.lng);
              if(this._handler) {
                this._handler(address);
              }
            }
        }
        this._searchBox = searchElement.search(this._searchSettings);
        this._handler = null;
    }

    onSelect(handler) {
      this._handler = handler;
    }
}