var div = document.createElement('div');
div.classList.add('youtuber');
document.body.appendChild(div);

var vid = $('video').get(0);

vid.addEventListener('ended', function(e) {
    console.log('The video ended!');
});

setTimeout(function(){
    vid.trigger('')
},1000)