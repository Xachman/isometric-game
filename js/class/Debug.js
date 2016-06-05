Debug = function (display) {
    this.target;
    this.setDefault = function(item, defaultValue) {
        if(typeof item === 'undefined') {
            return defaultValue;
        }
        return item;
    }
    this.display = this.setDefault(display, true);
    this.debugGroupBody = function (group) {
        for (var i = 0; i < group.children.length; i++) {
            var child = group.children[i];
            game.debug.body(child);   
        }
        return this;
    }
    
    this.debugBody = function (item) {
        game.debug.body(item);
        this.target = item;
        return this;
    }
    this.bodyInfo = function(item) {
        var target = this.setDefault(item, this.target);
        game.debug.bodyInfo(target, 32, 32);
        return this;
    }
    
}