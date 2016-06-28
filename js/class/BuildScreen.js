BuildScreen =  function () {
    this.width = document.documentElement.clientWidth * 0.8;
    this.height = document.documentElement.clientHeight * 0.8;
    this.ajax = new Ajax();
    this.tempEngine = new TemplateEngine();
    this.items;
    this.displayHTML = '';
    this.init = function() {
        var obj = this;
        this.ajax.getJson('/data/items.json', function(data){
            obj.getItems(data);
            obj.buildElements();
        });
    }
    this.getItems = function(data) {
        this.items = JSON.parse(data);
    }
    
    this.buildElements = function() {
        this.createTabs();
    }
    
    this.createTabs = function() {
        var itemTitles = Object.keys(this.items);
        var obj = this;
        var data = {tabs: []} 
        var obj = this;
        this.loop(itemTitles, function(itemName, index) {    
            data.tabs.push({name: itemName});
            var items = obj.items[itemName];
            console.log(items);
            data.tabs[index].items =  items;
        });
        console.log(data);
        var obj = this
        this.tempEngine.getTemplate('/view/tabs.html', data, function(html) {
            obj.addHTML(html);
            obj.insertHTML();
        });
//        this.displayHTML = '<div class="tabs">';
//        this.loop(itemTitles, function(item, index) {
//            obj.createTab(item);
//        });
//        this.displayHTML += '</div>';
    }
    this.createItemsBlock = function() {
        var obj = this;
        var itemKeys = Object.keys(this.items);
        this.displayHTML += '<div class="items">';
        this.loop(itemKeys, function(items, index) {
            obj.createItems(items);
        })
        this.displayHTML += '</div>';
    }
    this.createItems = function(items) {
        var obj = this;
        this.loop(items, function(item, index) {
                obj.createItem(item);
        })
    }
    this.createItem = function(item) {
  //      this.addHTML('<div class="item">'++'</div>')
    }
    this.createTab = function(name) {
        this.displayHTML += '<div class="tab">'+name+'</div>';
    }
    this.insertHTML = function() {
        console.log(this.displayHTML);
        document.getElementById('buildScreen').innerHTML = this.displayHTML;
    }
    
    this.loop = function(items, callback) {
        for(var i = 0; i < items.length; i++) {
            callback(items[i], i);
        }
    }
    this.addHTML = function(html) {
        this.displayHTML += html;
    } 
    this.init();
}
    


