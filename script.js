/***albums***/

albums();
function albums(){
    $.get('http://localhost/playlist/public_html/api/playlist', function(data){
        var albumsConatainer = $('<div>',{class:"albums-container"}).appendTo('body');
        $(data.data).each(function(i,el){
            var album = $('<picture>',{class:"album-pic", id:el.id}).appendTo(albumsConatainer);
            $('<figcaption>',{
                text:el.name
            }).appendTo(album);
            $('figcaption').circleType({radius: 130});
            var editor = $('<div>',{class:"editor"}).appendTo(album);
            $('<button>',{text:"✖",click:function(e){deleteAlbumPopup(e,null);}}).appendTo(editor);
            $('<button>',{text:"✏",click:function(e){editPlaylist(e,el.id);}}).appendTo(editor);
            var picContainer = $('<div>',{class:"pic-container"}).appendTo(album);
            $('<img>',{src: el.image,alt:el.name}).appendTo(picContainer);
            var playContainer = $('<div>',{class:"play-container"}).appendTo(picContainer);
            $('<button>',{text:"►", class:"play-unicode",click:function(e){playAlbum(e,el.id);}}).appendTo(playContainer);
        });
    });
}




function playAlbum(e,id){
    $('input.back-button').css({"display":"block"});
    $('input.back-button').attr("onclick","backHome()");
    $('input.search').css({"display":"none"});
    $('.albums-container').remove();

    $.get('playlist.html', function(playlistData){
        let playlistConatainer = $('<div>',{class:"playlist-container"}).appendTo('body');
        $.get("" + 'http://localhost/playlist/public_html/api/playlist/' + id +"", function(data){
            let dataAlbum = data.data;
           $(playlistData).appendTo(playlistConatainer);
           $(playlistConatainer).find($('div.pic-container img')).attr("src",dataAlbum.image);
           $('.playlist-editor button.deleteAlbumButton').attr("onclick","deleteAlbumPopup(" + "null,"+id+ ")");
           $('.playlist-editor button.editAlbumButton').attr("onclick","editPlaylist(" + "null,"+id+ ")");
           $('.play-unicode').attr("onclick","pauseAudio()");
            $.get("" + 'http://localhost/playlist/public_html/api/playlist/' + id +'/songs' +"", function(dataSong){           
                let dataSongs = dataSong.data.songs;
                var audio = $("#audio");
                $(audio).attr("src",dataSongs[0].url);
                $(audio).attr("onplay","changeUnicodToPause()");
                $(audio).attr("onpause","changeUnicodToPlay()");
                audio[0].load();
                var nameSong = $(playlistConatainer).find($('span.name'));
                $(nameSong).html(dataSongs[0].name);                
                var songList = $(playlistConatainer).find($('div.song-list ol'));
                $(dataSongs).each(function(i,el){
                    let currentSongId = i+ 1 + ".";
                    var li =  $('<li>').appendTo(songList);
                    $('<span>',{text:currentSongId}).appendTo(li);
                    $('<button>',{text:el.name, click:function(e){
                        $('li span').each(function(i,el){
                            $(el).html(i+1 + ".");
                        });
                        $('li').each(function(i,el){
                            $(el).css({"opacity":"0.65"});
                        });                        
                        audio[0].pause();
                        $(audio).attr("src",el.url);
                        audio[0].load();
                        audio[0].play();                        
                        $(nameSong).html(el.name); 
                        $(e.target.previousSibling).html("►");
                        $(e.target).parent().css({"opacity":"1"});
                    }                               
                    }).appendTo(li);
                    $('li:first-child span').html("►");
                    $('li:first-child').css({"opacity":"1"});
                });
                console.log(dataSongs);
            });       
        });        
    });
}

function playAudio(){
   var audio = $("#audio"); 
   audio[0].load();
   audio[0].play();  
   changeUnicodToPause();
}

function pauseAudio(){
   var audio = $("#audio");  
   audio[0].pause();   
   changeUnicodToPlay();
}

function changeUnicodToPause(){
   $('div.playlist-body .pic-container img').css({"animation-play-state":"running"});  
   $('.play-unicode').attr("onclick","pauseAudio()");
   $(".play-unicode").html('❚❚');
   $(".play-unicode").css({"padding":"0px","font-size":"22.2px"});  
}

function changeUnicodToPlay(){
    $('div.playlist-body .pic-container img').css({"animation-play-state":"paused"}); 
    $('.play-unicode').attr("onclick","playAudio()");
    $(".play-unicode").html('►');
    $(".play-unicode").css({"padding":"1px 0 0 5px","font-size":"23.5px"});
}


function deleteAlbumPopup(e,idAlbum){
    console.log(idAlbum);
    if(idAlbum === null){
        var id = $(e.target).parents('picture').attr("id");   
    }else{
        var id = idAlbum;
    }   
    var popup =$('<div>',{
       id:"popup1",
        click:function(e){
            if (e.target.id === 'popup1') {
		this.remove();
            }
        }
    }).appendTo('body');
    var content = $('<div>',{
        id:"popup_container1",
        class:"qurstionCont"
    }).appendTo(popup);
    $('<h2>',{text:"Are you Sure??",class:"qurstion"}).appendTo(content);
    $('<button>',{text:"YES",id:"yesDelete",click:function(e){deleteAlbum(id,popup);}}).appendTo(content);
    $('<button>',{text:"NO",id:"noDelete",click:function(){$(popup).remove();}}).appendTo(content);    
}

function deleteAlbum(id,pop){    
    console.log(id);
    $(pop).remove();
    $.ajax({
        url:'http://localhost/playlist/public_html/api/playlist/' + id ,
        type:'DELETE',
        success:function(){
            alert("success");
            $('header').siblings('div')[0].remove();
            backHome();
        }
    });
}

function backHome(){
    $('input.back-button').css({"display":"none"});
    $('input.search').css({"display":"block"});
    $('.playlist-container').remove();
    albums();    
}





/***popup***/

var newPlaylistObject={};
$('div.header-add button').click(createPopup);

$('body').keydown(function(e){
    if (e.keyCode === 27) {
        $('#popup1').remove();
    }  
});
function createPopup(){
   var popup =$('<div>',{
       id:"popup1",
        click:function(e){
            if (e.target.id === 'popup1') {
		this.remove();
            }
        }
    });
   $.get('popupAlbums.html',function(data){
        var content = $('<div>',{
            id:"popup_container1",
            html:data
        }).appendTo(popup);
        content.find('form#formAlbum').submit(function(e){
            e.preventDefault();          
            newPlaylistObject.name = $(e.target).find('input[name=name]').val();
            newPlaylistObject.image = $(e.target).find('input[name=pic]').val();
            console.log(newPlaylistObject);
            addSongs($(e.target));
        });
        $('button#previewButton').click(function(e){
            e.preventDefault();
            var picUrl = $(' form input[name=pic]').val();
           $('img#previewButton').attr("src", ("" + picUrl + "")); 
        });

   });      
    popup.appendTo('body');
}

function addSongs(form){
    var content = form.parent().parent();       
    content.remove();
    $.get('popupSongs.html',function(data){
        var newContent = $('<div>',{
            id:"popup_container",
            html:data
        }).appendTo($('#popup1'));
        for(var i =0; i<3; i++){
           addSong().prependTo(newContent.find('form'));
        }
        newContent.find('button#addSong').click(function(e){
            e.preventDefault();
            addSong().insertBefore(newContent.parent().find('#containerButton')); 
        });
        newContent.find('form#formSongs').on("submit", function(e){
            e.preventDefault();
            newPlaylistObject.songs=[];
            $(e.target).find('div.containerInput').each(function(i,el){
               var song = {};
               song.url = $(el).find('input.inputUrl').val();
               song.name =$(el).find('input.inputName').val();
               newPlaylistObject.songs.push(song);
            });
            console.log(newPlaylistObject);            
            newContent.parent().remove();
            addAlbum();
        });
    });
}

function addAlbum(){
    $.post('http://localhost/playlist/public_html/api/playlist',newPlaylistObject,function(data,textStatus, xhr){
        console.log(xhr.status); 
        $('header').siblings('div')[0].remove();
        albums();
    });
    
}

function editPlaylist(v,id){
    if (v === null){
       pauseAudio(); 
    }
    console.log("edit is active" + ": "+ id);
    $.get("" + 'http://localhost/playlist/public_html/api/playlist/' + id +"", function(data){
        createPopupToEdit(data.data,id);
    });
}

function editAlbum(id){
    $.post('http://localhost/playlist/public_html/api/playlist/'+ id,{"name": editAlbumObject.name , "image":editAlbumObject.image} ,function(data, status){
        $('header').siblings('div')[0].remove();
        albums();
    });
}
function saveNewSongs(id, songs){
    $.post('http://localhost/playlist/public_html/api/playlist/'+ id + "/songs",{songs} ,function(data, status){
        $('header').siblings('div')[0].remove();
        albums();
    });    
}

var editAlbumObject={};
function createPopupToEdit(val,id){
   var popup =$('<div>',{
       id:"popup1",
        click:function(e){
            if (e.target.id === 'popup1') {
		this.remove();
            }
        }
    });
   $.get('popupAlbums.html',function(data){
        var content = $('<div>',{
            id:"popup_container1",
            html:data
        }).appendTo(popup);
        $('input#inputName').val(val.name);
        $('input.inputUrl').val(val.image);
        $('h2#title1').html("Update existing playlist");
        content.find('form#formAlbum').submit(function(e){
            e.preventDefault();          
            editAlbumObject.name =$(e.target).find('input[name=name]').val();
            editAlbumObject.image =$(e.target).find('input[name=pic]').val();
            editAlbum(id);
            editSongs($(e.target),id);
        });
        $('button#previewButton').click(function(e){
            e.preventDefault();
            var picUrl = $(' form input[name=pic]').val();
           $('img#previewButton').attr("src", ("" + picUrl + "")); 
        });

   });      
    popup.appendTo('body');
}

function editSongs(form,id){
    var content = form.parent().parent();       
    content.remove();
    $.get("" + 'http://localhost/playlist/public_html/api/playlist/' + id +"/songs", function(dataSongs){ 
        console.log(dataSongs);
        let songsArray = dataSongs.data.songs;
        console.log(songsArray);
        $.get('popupSongs.html',function(data){
            var newContent = $('<div>',{
                id:"popup_container",
                html:data
            }).appendTo($('#popup1'));
            var arrayCount = Number(songsArray.length-1);
            for(arrayCount; arrayCount>=Number(0); arrayCount--){ 
                console.log(arrayCount);
              var song = addSong();
              $(song).find('input.inputName').val(songsArray[arrayCount].name);
              $(song).find('input.inputUrl').val(songsArray[arrayCount].url);
              song.prependTo(newContent.find('form'));
              
            }
            $('h2#title').html("Update playlist songs");
            $('button#remove_btn').html("UPDATE");
            newContent.find('button#addSong').click(function(e){
                e.preventDefault();
                addSong().insertBefore(newContent.parent().find('#containerButton')); 
            });
            newContent.find('form#formSongs').on("submit", function(e){
                e.preventDefault();
                 var songs=[];
                $(e.target).find('div.containerInput').each(function(i,el){
                   var song = {};
                   song.url = $(el).find('input.inputUrl').val();
                   song.name =$(el).find('input.inputName').val();
                   songs.push(song);
                });         
                newContent.parent().remove();
                saveNewSongs(id,songs);
            });
        });
    });
    

}


    function addSong(){
        var containerSong = $('<div>',{class:"containerInput"});
        var labelUrl = $('<label>',{text:"Song URL"}).appendTo(containerSong);
        $('<input>',{
            class:"inputUrl",
            type:"text"
        }).appendTo(labelUrl);
        var labelName = $('<label>',{text:"Name"}).appendTo(containerSong);
        $('<input>',{
            class:"inputName",
            type:"text"
        }).appendTo(labelName); 
        return containerSong;
    }




