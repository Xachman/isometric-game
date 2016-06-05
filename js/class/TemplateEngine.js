TemplateEngine = function() {
    this.ajax = new Ajax();
    this.parser = new DOMParser();
    this.regex = /{{([^%>]+)?}}/g;
    this.getTemplate = function(url, data, callback) {
        url = this.randomizeUrl(url);
        var obj = this;
        this.ajax.get(url, function(view) {
            obj.insertData(view, data);
        });
    }
    this.randomizeUrl = function(url) {
        return url+'?decache='+Date.now();
    }
    
    this.insertData = function(view, data) {
        this.findLoops(view, data);
        
    }
    
    this.findLoops = function(view, data) {
        
        var doc = this.parser.parseFromString(view, "text/html");
        var loops = doc.querySelectorAll("[data-loop]");
        
        //console.log(loops);
        this.processLoop(loops, data);
    }
    
    this.processLoop = function(loops, data) {
        var obj = this;
        
        this.loop(loops, function(loop, item){
            var html = obj.replaceLoop(loop.outerHTML, data);
            console.log(data);
            console.log(html);
            var directive = match
        });
    }
    this.loop = function(items, callback) {
        for(var i = 0; i < items.length; i++) {
            callback(items[i], i);
        }
    }
    
    this.replaceLoop = function(html, data, callback) {
        var count = 0;
        var directive;
        while(match = this.regex.exec(html)) {
            count++;
            if(count = 1){
                directive = match[1];
            }else{
                html = html.replace(match[0], data[match[1]]);
            }
            
        }
        return html;
    }
}


