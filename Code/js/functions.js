var youtuber_video = $('video').get(0);

class youtuber{
    
    constructor(){
        var me = this;
        
        this.get_video_id();
        window.addEventListener('yt-page-data-updated', function(){
            me.get_video_id();
        });
        
        this.get_current_time();
        youtuber_video.ontimeupdate = function(){
            me.get_current_time();
        };
    }
    
    seek(time){
        youtuber_video.currentTime = time;
    }
    
    seek_and_back(time, timeout){
        
        var go               = false;
        var get_current_time = this.get_current_time();
        var me               = this;
        this.seek(time);
        
        youtuber_video.onplaying = function(){
            if(go == false){
                setTimeout(function(){
                    me.seek(get_current_time);
                    go = true;
                }, timeout*1000);
            }
        };
    }
    
    get_current_time(){
        var current_time         = youtuber_video.currentTime;
        const current_time_event = new CustomEvent('video_current_time', {
            detail:{
                current_time:current_time || 0
            }
        });
        window.dispatchEvent(current_time_event);
        
        return current_time;
    }
    
    get_video_id(){
        
        var video_id         = this.youtube_id(location.href);
        const video_id_event = new CustomEvent('video_id', {
            detail:{
                video_id:video_id || 0
            }
        });
        window.dispatchEvent(video_id_event);
        
        return video_id;
        
    }
    
    youtube_id(url){
        var ID = '';
        url    = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined){
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }else{
            ID = url;
        }
        return ID;
    }
    
    send_notification(options, event){
        
        var notify_options = {
            type   :options.type,
            title  :options.title,
            message:options.message,
            iconUrl:options.iconUrl || "icons/android-icon-192x192.png"
        };
        
        chrome.runtime.sendMessage({
            id    :"notify",
            params:notify_options,
            link  :options.link || null
        }, event);
    }
    
    time_format(secs, format){
        var hr   = Math.floor(secs/3600);
        var min  = Math.floor((secs-(hr*3600))/60);
        var sec  = Math.floor(secs-(hr*3600)-(min*60));
        var msec = Math.floor((secs-(hr*3600)-(min*60))*60);
        
        if(hr<10){
            hr = "0"+hr;
        }
        if(min<10){
            min = "0"+min;
        }
        if(sec<10){
            sec = "0"+sec;
        }
        if(msec<10){
            msec = "0"+msec;
        }
        if(hr){
            hr = "00";
        }
        
        if(format != null){
            var formatted_time = format.replace('hh', hr);
            formatted_time     = formatted_time.replace('h', hr*1+""); // check for single hour formatting
            formatted_time     = formatted_time.replace('mm', min);
            formatted_time     = formatted_time.replace('m', min*1+""); // check for single minute formatting
            formatted_time     = formatted_time.replace('ss', sec);
            formatted_time     = formatted_time.replace('s', sec*1+""); // check for single second formatting
            return formatted_time;
        }else{
            return hr+':'+min+':'+sec+':'+msec;
        }
    }
    
    read_json(json){
    
    
    
    }
}