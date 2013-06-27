define(['jquery','underscore', 'backbone','models/photo' ], function($,_,Backbone){

    Faceone.Collections.Photos = Backbone.Collection.extend({
        model:Faceone.Models.Photo,
        url:"db/photos_db.js"
    })
})

