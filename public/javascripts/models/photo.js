define(['jquery','underscore', 'backbone','models/photo' ], function($,_,Backbone){
Faceone.Models.Photo = Backbone.Model.extend({
    defaults: {
        name:'',
        photo_data:'',
        qoute:''
    },
    url:'/'
});

    //var photo = new Faceone.Models.Photo();
});