function I18nFetchMessageFactory($http) {
    return function(uri, config) {
        var payload, onSuccess;
        if(config.headers['Accept-Language']) uri += '&locale=' + config.headers['Accept-Language'];
        $http.jsonp(uri + '&callback=JSON_CALLBACK', config).success(function(body) {
            payload = body;
            if(payload && onSuccess) onSuccess(payload.message);
        });
        var wrapper = {
            success:function(cb) {
                onSuccess = cb;
                if(payload && onSuccess) onSuccess(payload);
            },
            error:function() {
            }
        };
        return  wrapper;
    }
}