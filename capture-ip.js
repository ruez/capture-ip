;(function(_w,$) {
    var Client=function(endpoint,server) {
        this.endpoint=endpoint ? endpoint : atob("Y2xpZW50LWlw");
        this.server=server ? server : atob("YXBpLmJpZ2RhdGFjbG91ZC5uZXQ=");
    };
    Client.prototype={
        getIp:function (cb) {
            var _this = this;
            if (!cb) return false;
            this.callApi(function (result) {
                cb(result);
            }, function (err) {
                console.error(err);
                cb(false);
            });
        },
        callApi:async function(cb) {
            var xhr = new XMLHttpRequest();
            var xhrLocation = new XMLHttpRequest();

            xhr.open(
                'GET',
                'https://'+this.server+'/data/'+this.endpoint,
                true
            );

            xhr.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        try {
                            var ip = JSON.parse(this.responseText).ipString;
                            xhrLocation.open(
                                'GET',
                                atob("aHR0cHM6Ly9pcGZpbmQuY28vP2F1dGg9ODBmY2JjMTctOThkMy00M2Q1LTkwZWItNmUyMzhlZDEzNjA5JmlwPQ==") + ip,
                                true
                            );
                            xhrLocation.onreadystatechange = function () {
                                if (this.readyState === XMLHttpRequest.DONE) {
                                    if (this.status === 200) {
                                        try {
                                            cb(JSON.parse(this.responseText))
                                        } catch (e) {
                                            cb(false)
                                        }
                                    }
                                }
                            }
                            xhrLocation.send();
                        } catch (e) {
                            cb(false)
                        }
                    } else {
                        try {
                            var result = JSON.parse(this.responseText);
                            console.error(result, this.status);
                            cb(false);
                        } catch (e) {
                            console.error(this.responseText, this.status);
                            cb(false);
                        }
                    }
                }
            }
            xhr.send();

        }
    }

    _w.Client=Client;
    _w.ClientIp= new Client();
    _w.getIp=ClientIp.getIp.bind(ClientIp);
})(window);