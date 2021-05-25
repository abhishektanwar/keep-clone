
class App{
	constructor() {
		this.notes = JSON.parse(localStorage.getItem('notes')) || []; 
		this.title = ""
		this.text = ""
		this.id = ""
		this.form = document.querySelector("#form");
		this.notesDisplay = document.querySelector("#notes");
		this.noteTitle = document.querySelector("#note-title")
		this.noteText = document.querySelector("#note-text")
		this.formButtons = document.querySelector("#form-btns")
		this.formCloseButton = document.querySelector("#form-close-btn")
		this.modal = document.querySelector(".modal")
		this.modalTitle = document.querySelector(".modal-title")
		this.modalText = document.querySelector(".modal-text")
		this.modalCloseButton = document.querySelector(".modal-close-btn")
		this.colorToolTip = document.querySelector("#color-tool-tip");
		this.placeholder = document.querySelector("#placeholder")

		this.render();
		this.addEventListeners();
	}

	addEventListeners() {
		document.body.addEventListener("click", event => {
			this.handleFormClick(event);
			this.selectNote(event);
			this.openModal(event);
			this.deleteNote(event);
	});


	this.form.addEventListener("submit",event => {
		event.preventDefault()
		console.log("siubmit")
		const title = this.noteTitle.value;
		const text = this.noteText.value;
		console.log("title",title);
		console.log("text",text)
		const hasNote = title || text;
		if(hasNote){
			this.addNote({title,text})
		}
	})

}
	render() {
		this.saveNotes();
		this.displayNotes();
	}

	addNote({title,text}){
	const newNote = {
		title,
		text,
		color:"white",
		id:notes.length > 0 ? notes[notes.length - 1].id + 1 : 1
	};
	this.notes = [...notes,newNote]
	render();
}


	displayNotes() {
		const hasNotes = this.notes.length > 0;
		this.placeholder.style.display = hasNotes ? "none" : "flex";
	
		this.notesDisplay.innerHTML = this.notes
			.map(
			note => `
			<div style="background: ${note.color};" class="note" data-id="${
				note.id
			}">
				<div class="${note.title && "note-title"}">${note.title}</div>
				<div class="note-text">${note.text}</div>
				<div class="toolbar-container">
				<div class="toolbar">
					<img class="toolbar-color" data-id=${
					note.id
					} src="https://icon.now.sh/palette">
					<img data-id=${
					note.id
					} class="toolbar-delete" src="https://icon.now.sh/delete">
				</div>
			  </div>
			</div>
		 `
		  )
		  .join("");
	  }
	

	saveNotes(){
		localStorage.setItem('notes',JSON.stringify(notes))
	}


}

new App();

