TemplateEngine = function () {
    this.ajax = new Ajax();
    this.parser = new DOMParser();
    this.regex = /{{\s*([^}]+)\s*}}/g;
    this.getTemplate = function (url, data, callback) {
        url = this.randomizeUrl(url);
        var obj = this;
        this.ajax.get(url, function (view) {
            obj.insertData(view, data);
        });
    }
    this.randomizeUrl = function (url) {
        return url + '?decache=' + Date.now();
    }

    this.insertData = function (view, data) {
        this.findLoops(view, data);

    }

    this.findLoops = function (view, data) {

        var doc = this.parser.parseFromString(view, "text/html");
        var loops = doc.querySelectorAll("[data-loop]");

        //console.log(loops);
        this.processLoop(loops, data);
        console.log(doc.body.innerHTML);
    }

    this.processLoop = function (loops, data) {
        var obj = this;
        
        this.loop(loops, function (loop, item) {
            var directive = loop.getAttribute('data-loop');
            var loop = obj.replaceLoop(loop, data, directive);
        });
        console.log(loops[0]);
    }
    this.loop = function (items, callback) {
        for (var i = 0; i < items.length; i++) {
            callback(items[i], i);
        }
    }

    this.replaceLoop = function (loop, data, directive) {
        var template = loop.innerHTML
        var newHTML = '';
        var obj = this;
        directive = directive.split(' ');
        var match = obj.regex.exec(template)
        var dataProperty = directive[0];
        this.loop(data[dataProperty], function (item, index) {
            var properties = match[1].split('.');
            properties.shift();
            var insert = item;
            obj.loop(properties, function (property, index) {
                insert = insert[property];
            });
            console.log(item);
            newHTML += template.split(match[0]).join(insert);
        });

        console.log(newHTML);
        loop.innerHTML = newHTML;
        return loop;
    }
}


