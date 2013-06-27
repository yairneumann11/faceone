require.config({
    paths: {
        "jquery": "libs/jquery-1.9.0.min",
        "underscore": "libs/underscore-min",
        "backbone": "libs/backbone",
        "bootstrap": "libs/bootstrap.min",
        "router": "router"

    },
    shim: {
        "underscore": {
            deps: [],
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        "bootstrap": {
            deps: ["jquery", "underscore"],
            exports: "bootstrap"
        }
    }
});


Faceone = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {},
    Events: {}
};

require(['views/index','router']);



