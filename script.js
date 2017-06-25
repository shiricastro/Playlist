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


$.get('albums.html', function(data){
   var data = data;
   $('.playlist-container').html(data);
});


