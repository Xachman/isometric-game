/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

TemplateHandler = function() {
    this.parser = new DOMParser();
    this.regex = /{{\s*([^}]+)\s*}}/g;
    this.loops;
    this.callback;
    
    this.insertData = function (view, data, callback) {
        this.callback = callback;
        this.findLoops(view, data);

    }

    this.findLoops = function (view, data) {

        var doc = this.parser.parseFromString(view, "text/html");
        var loops = doc.querySelectorAll("[data-loop]");
        
        console.log(loops);
        this.processLoops(loops, data);
        this.callback(doc.body.innerHTML);
        
    }

    this.processLoops = function (loops, data) {
        var obj = this;
        
        this.loop(loops, function (loop, item) {
            var directive = loop.getAttribute('data-loop');

                console.log(loops[1].querySelectorAll("[data-loop]")[0] === loops[2]);
           
            
            var loop = obj.replaceLoop(loop, data, directive);
        });
    }
    this.loop = function (items, callback) {
        for (var i = 0; i < items.length; i++) {
            callback(items[i], i);
        }
    }

    this.replaceLoop = function (loop, data, directive) {
        var template = loop.innerHTML;
        var newHTML = '';
        var obj = this;
        directive = directive.split(' ');
        var match = obj.regex.exec(template);
        var dataProperty = directive[0];
        console.log(dataProperty);
        this.loop(data[dataProperty], function (item, index) {
            var properties = match[1].split('.');
            properties.shift();
            var insert = item;
            obj.loop(properties, function (property, index) {
                insert = insert[property];
            });
            newHTML += template.split(match[0]).join(insert);
        });
        loop.innerHTML = newHTML;
        return loop;
    }
}
