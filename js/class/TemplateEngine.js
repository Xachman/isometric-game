TemplateEngine = function () {
    
    this.getTemplate = function (url, data, callback) {
        url = this.randomizeUrl(url);
        var obj = this;
        templateHandeler = new TemplateHandler();
        ajax = new Ajax();
        ajax.get(url, function (view) {
            templateHandeler.insertData(view, data, callback);
        });
    }
    this.randomizeUrl = function (url) {
        return url + '?decache=' + Date.now();
    }

    
}


