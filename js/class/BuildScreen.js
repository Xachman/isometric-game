BuildScreen =  function () {
    this.width = document.documentElement.clientWidth * 0.8;
    this.height = document.documentElement.clientHeight * 0.8;
    this.ajax = new Ajax();
    this.items;
    this.init = function() {
        var obj = this;
        this.ajax.getJson('/data/items.json', function(data){
            obj.getItems(data);
        });
    }
    this.getItems = function(data) {
        this.items = JSON.parse(data);
    }
    this.init();
}
    


