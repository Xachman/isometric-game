Ajax = function () {
    this.ajaxobj = new XMLHttpRequest();
    this.output;
    this.getJson = function (url, callback) {
        this.get(url, callback);
        
    }

    this.onreadystatechange = function (callback)
    {
           var http = this.ajaxobj;
        this.ajaxobj.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                callback(http.response);
            }
        }
    }
    this.get = function(url, callback) {
        this.onreadystatechange(callback);
        this.ajaxobj.open("GET", url+'?rand='+Date.now(), true);
        this.ajaxobj.send();
    }
}