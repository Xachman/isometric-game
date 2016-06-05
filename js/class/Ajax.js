Ajax = function () {
    this.ajaxobj = new XMLHttpRequest();
    this.output;
    this.getJson = function (url, callback) {
        console.log(url);
        this.onreadystatechange(callback);
        this.ajaxobj.open("GET", url, true);
        this.ajaxobj.send();
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
}