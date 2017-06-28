
class Popup {
	constructor (text) {
		this.text = text;
	}
	build () {
		this.popup = $('<div>', {
			id: "popup",
			click: function (e) {
				if (e.target.id === 'popup') {
					this.remove();
				}
			}.bind(this), 
			keydown: function (e) {
				console.log(e)
				if (e.keyCode === 27) {
					this.remove();
				}
			}.bind(this), 
		}).appendTo('body');
		var popupContainer = $('<div>', {
			id: "popup_container"
		}).appendTo(this.popup);
                $('<h2>', {
                    text:"Add Playlist Songs",
                    id:"title"
                }).appendTo(popupContainer);
                var containerInput = $('<div>',{
                    id:"containerInput"
                }).appendTo(popupContainer);
                var urlInput = $('<label>', {
                    text: "Song URL "
                }).appendTo(containerInput);
                $('<input>',{
                    type:"text",
                    id:"inputUrl"
                }).appendTo(urlInput);
                var nameInput = $('<label>', {
                    text: "Name: "
                }).appendTo(containerInput);
                $('<input>',{
                    type:"text",
                    class:"inputName"
                }).appendTo(nameInput);
                var containerButton = $('<div>',{
                    id:"containerButton"
                }).appendTo(popupContainer);
                var addButton = $('<button>', {
                        html: "Add another song", 
                        id: "addSong"
                        /*click: this.remove.bind(this), */
		}).appendTo(containerButton);
                $('<span>',{
                        html: "➕ "
                }).appendTo(addButton);
		$('<button>', {
			html: "FINISH & SAVE", 
			id: "remove_btn", 
			click: this.remove.bind(this), 
		}).appendTo(containerButton);
		
	}

	remove(e) {
		this.log('removed');
		this.popup.remove();
	}

	log (msg) {
		console.log(msg);
	}
}

class popupNewAlbum {
	constructor (text) {
		this.text = text;
	}
	build () {
		this.popupA = $('<div>', {
			id: "popup1",
			click: function (e) {
				if (e.target.id === 'popup1') {
					this.remove();
				}
			}.bind(this), 
			keydown: function (e) {
				console.log(e)
				if (e.keyCode === 27) {
					this.remove();
				}
			}.bind(this), 
		}).appendTo('body');
		var popupContainer = $('<div>', {
			id: "popup_container1"
		}).appendTo(this.popupA);
                $('<h2>', {
                    text:"Add New Playlist",
                    id:"title1"
                }).appendTo(popupContainer);
                var containerLeft = $('<div>',{
                    id:"containerLeft"
                }).appendTo(popupContainer);
                var containerInput = $('<div>',{
                    id:"containerInput1"
                }).appendTo(containerLeft);
                var nameInput = $('<label>', {
                    text: "Playlist Name "
                }).appendTo(containerInput);
                $('<input>',{
                    type:"text",
                    id:"inputName"
                }).appendTo(nameInput);
                var urlInput = $('<label>', {
                    text: "playlist URL "
                }).appendTo(containerInput);
                $('<input>',{
                    type:"text",
                    class:"inputUrl"
                }).appendTo(urlInput);
                var containerButton = $('<div>',{
                    id:"containerButton1"
                }).appendTo(containerLeft);
                var addButton = $('<button>', {
                        html: "Next", 
                        id: "nextButton",
                        click: this.popOpen.bind(this)
		}).appendTo(containerButton);
		$('<button>', {
			html: "Preview", 
			id: "previewButton"
			/*click: this.remove.bind(this), */
		}).appendTo(containerButton);
                var containerImg = $('<div>',{
                    id:"containerImg"
                }).appendTo(popupContainer);
                $('<img>', {
			src: this.text, 
			id: "previewimg"
		}).appendTo(containerImg);
		
	}

	remove(e) {
		this.log('removed');
		this.popupA.remove();
                
	}
        popOpen(e){
               var popup1 = new Popup('Lovely popup');
               popup1.build();
               this.remove();
        }

	log (msg) {
		console.log(msg);
	}
}

