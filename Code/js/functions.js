var youtuber_video = $('video').length > 0?$('video').get(0):null;

class youtuber{
    
    constructor(){
        var me = this;
        
        if(youtuber_video != null){
            this.get_video_id();
            window.addEventListener('yt-page-data-updated', function(){
                me.get_video_id();
            });
            
            this.get_current_time();
            youtuber_video.ontimeupdate = function(){
                me.get_current_time();
            };
        }
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
        if(youtuber_video != null){
            var current_time         = youtuber_video.currentTime;
            const current_time_event = new CustomEvent('video_current_time', {
                detail:{
                    current_time:current_time || 0
                }
            });
            window.dispatchEvent(current_time_event);
            
            return current_time;
        }
        
        return null;
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
    
    send_notification(options, event = null){
        
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
    
    time_format(secs, format, zero = true){
        var hr   = Math.floor(secs/3600);
        var min  = Math.floor((secs-(hr*3600))/60);
        var sec  = Math.floor(secs-(hr*3600)-(min*60));
        var msec = Math.floor((secs-(hr*3600)-(min*60))*60);
        
        if(zero == true){
            if(hr < 10){
                hr = "0"+hr;
            }
            if(min < 10){
                min = "0"+min;
            }
            if(sec < 10){
                sec = "0"+sec;
            }
            if(msec < 10){
                msec = "0"+msec;
            }
            if(hr){
                hr = "00";
            }
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
        
        var me = this;
        
        $.each(json, function(id, j){
            window['run'+id] = false;
            window['t'+id]   = setInterval(function(){
                
                var current_time_now = parseInt(me.get_current_time());
                var start            = parseInt(j.start);
                var end              = parseInt(j.end);
                var event            = j.event;
                
                if(current_time_now >= start && current_time_now < end && window['run'+id] == false){
                    //console.log(id,'başladı', current_time_now, start);
                    //console.log(start, end);
                    
                    if(event.action == 'seek'){
                        me.seek(event.time);
                    }else if(event.action == 'notify'){
                        me.send_notification(event.data,function(res){
                            //console.log(res);
                        });
                    }else if(event.action == 'seekandback'){
                        me.seek_and_back(event.time,event.timeout);
                    }
                    
                    window['run'+id] = true;
                }
                
                if(current_time_now >= end && window['run'+id] == true){
                    //console.log(id,'bitti', current_time_now, end);
                    clearInterval(window['t'+id]);
                }
                
            }, 800);
            
        });
        
    }
    
    time_parser(time){
        
        console.log(time);
        
        const regex = /\d+/gms;
        const str   = time;
        let m;
        
        while((m = regex.exec(str)) !== null){
            // This is necessary to avoid infinite loops with zero-width matches
            if(m.index === regex.lastIndex){
                regex.lastIndex++;
            }
            
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
            });
        }
        
        var hr   = '';
        var min  = '';
        var sec  = '';
        var msec = '';
        
    }
}