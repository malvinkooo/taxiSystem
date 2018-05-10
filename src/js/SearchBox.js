class SearchBox {
    constructor(searchElement) {
        this._searchSettings = {
            apiSettings: {
              responseAsync: function(settings, callback){
                GeoService.getAddressHint(settings.urlData.query, callback);
              },
            },
            fields: {
              results: 'results',
              title: 'title',
              description: 'description',
              url: false
            },
            minCharacters : 3
        }
        this._searchBox = searchElement.search(this._searchSettings);
    }
}