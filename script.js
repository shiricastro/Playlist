/*
         <div>pencil ✏ ✐ </div>
        <div>delete ✖</div>
        <div>play  ►</div>
        <div>add ➕</div>
        <div>pause ❚❚ </div>

 */
albums();
function albums(){
    $.get('http://localhost/playlist/public_html/api/playlist', function(data){
        var albumsConatainer = $('<div>',{class:"albums-container"}).appendTo('body');
        $(data.data).each(function(i,el){
            var album = $('<picture>',{class:"album-pic", id:el.id}).appendTo(albumsConatainer);
            $('<figcaption>',{
                text:el.name
            }).appendTo(album);
            var editor = $('<div>',{class:"editor"}).appendTo(album);
            $('<button>',{text:"✖",click:function(e){deleteAlbumPopup(e,null);}}).appendTo(editor);
            $('<button>',{text:"✏",click:editAlbum}).appendTo(editor);
            var picContainer = $('<div>',{class:"pic-container"}).appendTo(album);
            $('<img>',{src: el.image,alt:el.name}).appendTo(picContainer);
            var playContainer = $('<div>',{class:"play-container"}).appendTo(picContainer);
            $('<button>',{text:"►", class:"play-unicode",click:function(e){playAlbum(e,el.id);}}).appendTo(playContainer);
        });
    });
}

function playAlbum(e,id){
    $('input.back-button').css({"display":"block"});
    $('input.back-button').click(backHome);
    $('input.search').css({"display":"none"});
    $('.albums-container').remove();

    $.get('playlist.html', function(playlistData){
        let playlistConatainer = $('<div>',{class:"playlist-container"}).appendTo('body');
        $('.playlist-editor button.deleteAlbumButton').click(function(e){deleteAlbumPopup(e,id);});
        console.log($(playlistData).find('.playlist-editor button.deleteAlbumButton'));
        $.get("" + 'http://localhost/playlist/public_html/api/playlist/' + id +"", function(data){
            let dataAlbum = data.data;
           $(playlistData).appendTo(playlistConatainer);
           $(playlistConatainer).find($('span.name')).html(dataAlbum.name);
           $(playlistConatainer).find($('div.pic-container img')).attr("src",dataAlbum.image);
        });

        $.get("" + 'http://localhost/playlist/public_html/api/playlist/' + id +'/songs' +"", function(dataSong){           
            let dataSongs = dataSong.data.songs;
            var audio = $(playlistConatainer).find($('audio source'));
            $(audio).attr("src",dataSongs[0].url);
            var songList = $(playlistConatainer).find($('div.song-list ol'));
            $(dataSongs).each(function(i,el){
                var li =  $('<li>').appendTo(songList);
                $('<span>',{text:"►"}).appendTo(li);
                $('<button>',{text:el.name, click:function(e){
                      $(audio).attr("src",el.url); 
                      console.log(el.url);
                    }       
                }).appendTo(li);
            });
            console.log(dataSongs);
        });       
    });
}

function deleteAlbumPopup(e,idAlbum){
    console.log(e);
    var id = $(e.target).parents('picture').attr("id");
    var popup =$('<div>',{
       id:"popup1",
        click:function(e){
            if (e.target.id === 'popup1') {
		this.remove();
            }
        }
    }).appendTo('body');
    var content = $('<div>',{
        id:"popup_container1"
    }).appendTo(popup);
    $('<h2>',{text:"Are you Sure??"}).appendTo(content);
    $('<button>',{text:"YES",id:"yesDelete",click:function(e){deleteAlbum(id,popup);}}).appendTo(content);
    $('<button>',{text:"NO",id:"noDelete",click:function(){$(popup).remove();}}).appendTo(content);
}
function deleteAlbum(id,pop){
    console.log(id);
    $(pop).remove();
}
function editAlbum(){
    
}

function backHome(){
    $('input.back-button').css({"display":"none"});
    $('input.search').css({"display":"block"});
    $('.playlist-container').remove();
    albums();    
}


var newPlaylistObject={};
$('div.header-add button').click(createPopup);

$('body').keydown(function(e){
    if (e.keyCode === 27) {
        $('#popup1').remove();
    }  
});
function createPopup(e){
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
        content.find('form').submit(function(e){
            e.preventDefault();
            newPlaylistObject.name = $(e.target).find('input[name=name]').val();
            newPlaylistObject.pic = $(e.target).find('input[name=pic]').val();
            //console.log(newPlaylistObject);
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
        newContent.find('form').on("submit", function(e){
            e.preventDefault();
            newPlaylistObject.songs=[];
            $(e.target).find('div.containerInput').each(function(i,el){
               var song = {};
               song.url = $(el).find('input.inputUrl').val();
               song.name =$(el).find('input.inputName').val();
               newPlaylistObject.songs.push(song);
            });
            //console.log(newPlaylistObject);
            newContent.parent().remove();
        });
    });
    
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

}










