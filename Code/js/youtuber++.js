var youtuber_class = new youtuber;

var div = document.createElement('div');
div.classList.add('youtuber');
document.body.appendChild(div);

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
    
    
    window.addEventListener('video_current_time', res => {
        var t = youtuber_class.time_format(res.detail.current_time);
        $('.youtuber').text(t)
    })
    
    var json = [
        {
            "00:01:00:00": {
                "event" : "seek",
                "time" : 140
            },
            "00:01:30:00": {
            
            },
            "00:01:30:00-00:02:00:00": {
            
            }
        }
    ]
    
});