requirejs.config({
    paths: {
        ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
    }
});

require(['ramda','jquery'], function (_, $) {
    // trace:: String -> a -> a
    const trace = _.curry((tag, x) => {
        console.log(tag, x);
        return x;
    });

    const Impure = {
        getJSON: _.curry((callback, url) => {
            $.getJSON(url, callback);
        }),

        setHtml: _.curry((selector, html) => {
            $(selector).html(html);
        })
    };

    // img:: String -> DOM
    const img = function (url) {
        return $('<img />', {
            src: url
        });
    }

    // url:: String -> String
    const url = function (t) {
        return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + t + '&format=json&jsoncallback=?';
    };


    const mediaUrl = _.compose(_.prop('m'), _.prop('media'));

    const imgs = _.compose(_.map(img), _.map(mediaUrl), _.prop('items'));

    ///////////// Impure
    const renderImgs = _.compose(Impure.setHtml('body'), imgs);

    const app = _.compose(Impure.getJSON(renderImgs), url);

    app('stephencurry');
});
