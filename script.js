/*
         <div>pencil ✏ ✐ </div>
        <div>delete ✖</div>
        <div>play  ►</div>
        <div>add ➕</div>
        <div>pause ❚❚ </div>

    <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <path id="text_0_path" d="M 100 150 A 100 100 0 1 1 300 150"/>
        </defs>   
        <text text-anchor="middle">
            <textPath xlink:href="#text_0_path" startOffset="50%">Test Text hvmvgjhmmjmb</textPath>
        </text>
    </svg>
 */



/*new Promise(function(resolve){
    get("albums.html","albums-container" );
    resolve();
})
.then(function(){
    return new Promise(function(resolve){
        console.log($('button#hh'));
        console.log($('button.add-unicode'));
        $('button.add-unicode').each(function(i,el){
            $(el).click(function(e){
                e.preventDefault();
                get("playlist.html","playlist-container" );
                $('.albums-container').remove();
                $('input.search').css({"display":"none"});
                $('input.back-button').css({"display":"block"});
            });
        });                
        resolve();         
    });
})
.then(function(){
    return new Promise(function(resolve){
            
                console.log("3");
            resolve();
        }); 
});*/

    

function get(url, className){
     $.get( url , function(data){
       var container = $('<div>',{class:className}).appendTo('body');
       container.html(data);
    });   
}

 get("albums.html","albums-container");
   


$(document).ready(function(){
        get("playlist.html","playlist-container" );
     $("button.play-unicode").click(function(e){
        $(".playlist-container").css({"display":"flex"});
        $(".albums-container").css({"display":"none"});
        $('input.back-button').css({"display":"block"});
        $('input.search').css({"display":"none"});
        toHomePage();
    });      
});

function toHomePage(){
   $('input.back-button').click(function(){
        $(".playlist-container").css({"display":"none"});
        $(".albums-container").css({"display":"flex"});
        $('input.back-button').css({"display":"none"});
        $('input.search').css({"display":"block"});
   }); 
}






