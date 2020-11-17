var youtuber_class = new youtuber;

window.addEventListener('load', function(){
    
    /*
    var options = {
        type   :"basic",
        title  :"Just a test!",
        message:"Let's see if it works",
        iconUrl:"icons/android-icon-192x192.png",
        link   :'https://hayatikodla.net'
    };
    
    youtuber_class.send_notification(options, function(response){
        console.log(2, response);
    });
    */
    
    //console.log(youtuber_class.get_video_id());
    
    /*
    window.addEventListener('video_id', res => {
        console.log('event',res.detail.video_id)
    })
    */
    
    /*
    window.addEventListener('video_current_time', res => {
        var t = res.detail.current_time;
        $('.youtuber').text(t);
    });
    */
    
    var json = [
        {
            "start":6,
            "end"  :7,
            "event":{
                "action":"seek",
                "time"  :100
            }
        },
        {
            "start":105,
            "end"  :111,
            "event":{
                "action":"notify",
                "data"  :{
                    type   :"basic",
                    title  :"Just a test!",
                    message:"Let's see if it works",
                    iconUrl:"icons/android-icon-192x192.png",
                    link   :'https://hayatikodla.net'
                }
            }
        },
        {
            "start":120,
            "end"  :121,
            "event":{
                "action" :"seekandback",
                "time"   :90,
                "timeout":5
            }
        }
    ];
    
    youtuber_class.read_json(json);
    
});