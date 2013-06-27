define(['jquery','underscore', 'backbone' ], function($,_,Backbone){
    Faceone.Events.vent = _.extend({},Backbone.Events);
    Faceone.Router.router = Backbone.Router.extend({
    routes: {
        "": "index"
    },

    index: function(){
        Faceone.Events.vent.trigger('get_all_photos');
    }
});
 var router = new Faceone.Router.router;


Backbone.history.start();

});