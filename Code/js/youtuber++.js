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
    
    $(window).favitab({
        out  : {  //Transactions to be done when you exit the tab
            title : 'Where are you go?', // (string) Out title text
            time  : null, // (null | int ) Let the process begin after a few seconds.
            favicon : "assets/img/sad.png", // (string) Out favicon path
            sound : "assets/sound/dontgo.mp3", // (string) Out mp3 path
        },
        back : { //Sekmeye geri gelince yapılacak işlemler
            title : null, // (string) Back title text
            time  : null, // (null | int ) Let the process begin after a few seconds.
            favicon : null, // (string) Back favicon path
            sound : "asstes/sound/welcome.mp3", //(string) mp3 tam yolu
        }
    });
    
});