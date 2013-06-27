define(['jquery','underscore', 'backbone', 'router','text!templates/_photo_display.html','collections/Photos','models/Photo','bootstrap' ], function($,_,Backbone,router,templates,bootstrap){

    Faceone.Views.Index = Backbone.View.extend({
        self: this,
        el: "#photo-grid",
        url:"/save",
        initialize:function(){
            var that = this;
            this.same_hight();
            Faceone.Events.vent.on('get_all_photos', this.get_photos());//listen to the event triggered by the index router

            $('#start-photo').on('click',function(){//init camera
                that.photo_handler();
            });

            $('#myModal').modal({//on click the take a photo popups apears
                show:false,
                toggle: true
            });
        },

        get_photos: function(){
            self.photos = new Faceone.Collections.Photos();//create a new photo collection
            var that = this;
            self.photos.fetch({
                error: function(e){
                },
                success: function(){
                    that.render(self.photos);
                }
            });//get all photos from database
        },
        render: function(photos){
            var template = _.template(templates, { photos:photos.models } );
            this.$el.html(template);
        },
        same_hight: function(){
            var boxes = $('.same-height');
            var maxHeight = Math.max.apply(
                Math, boxes.map(function() {
                    return $(this).height();
                }).get());
            boxes.height(maxHeight);
        },
        photo_handler: function(){
            var that = this;
            var streaming = false,
                video = document.querySelector('#video'),
                cover        = document.querySelector('#cover'),
                canvas       = document.querySelector('#canvas'),
                photo        = document.querySelector('#photo'),
                startbutton  = document.querySelector('#startbutton'),
                width = 320,
                height = 240

            self.init_video = new function(){
                navigator.getMedia = ( navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);

                navigator.getMedia(
                    {
                        video: true,
                        audio: false
                    },
                    function(stream) {
                        if (navigator.mozGetUserMedia) {
                            video.mozSrcObject = stream;
                        } else {
                            var vendorURL = window.URL || window.webkitURL;
                            video.src = vendorURL.createObjectURL(stream);
                        }
                        video.play();
                        $("#startbutton").on('click', function(){
                            stream.stop();
                        })
                    },
                    function(err) {
                        console.log("An error occured! " + err);
                    }
                );

                video.addEventListener('canplay', function(ev){
                    if (!streaming) {

                        height = video.videoHeight / (video.videoWidth/width);
                        video.setAttribute('width', width);
                        video.setAttribute('height', height);
                        canvas.setAttribute('width', width);
                        canvas.setAttribute('height', height);
                        streaming = true;
                    }
                }, false);
            };// create the dependencies for video element stream



            self.takepicture = function() {

                $('body').append('<div id="flash"></div>');//add flash div to dom
                $('#flash').fadeIn('fast',function(){//fadein fadeout flash div
                    $('#flash').fadeOut('fast');
                });
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(video, 0, 0, width, height);
                var data = canvas.toDataURL('image/png');
                var save_data = {
                    photo_data:data,
                    name:"liron",
                    qoute:"bla bla"
                };//information to save in the modle
                var photo_model = new Faceone.Models.Photo();
                photo_model.save(save_data,
                    {
                    attr:data,
                    success:function(response,model){
                        self.photos.add(photo_model);//listen to the event triggered by the index router
                        //var last_model = self.photos.get('c'+self.photos.length)
                        that.render(self.photos);
                        $('#myModal').modal('hide');
                    },
                    error: function(response,model){
                        console.log('error',response,model);
                    }
                });
                //photo.setAttribute('src', data);
            }

            startbutton.addEventListener('click', function(ev){
                self.takepicture();
                ev.preventDefault();
            }, false);


        }
    });

    var index = new Faceone.Views.Index();
});