class App{
	constructor() {
		this.notes = JSON.parse(localStorage.getItem('notes'))||[];
		this.title = ""
		this.text = ""
		this.id = ""
		this.form = document.querySelector("#form");
		this.$notes = document.querySelector("#notes");
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

		document.body.addEventListener("mouseover",event=>{
			this.openToolTip(event);
		});

		document.body.addEventListener("mouseout",event =>{
			this.closeToolTip(event);
		});

		this.colorToolTip.addEventListener("mouseover",event =>{
			this.style.display="flex";
		});

		this.colorToolTip.addEventListener("mouseout",event =>{
			this.style.display="none"
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

		this.formCloseButton.addEventListener("click",event=>{
			event.stopPropagation();
			this.closeForm();
		});

		this.modalCloseButton.addEventListener("click",event=>{
			this.closeModal(event)
		})

	}

	handleFormClick(event){
		const isFormClicked = this.form.contains(event.target);
		const title = this.noteTitle.value;
		const text = this.noteText.value;
		const hasNotes = title || text;
		if(isFormClicked){
			this.openForm()
		}else if (hasNotes){
			this.addNote({title,text})
		}else{
			this.closeForm();
		}
	}

	openForm(){
		this.form.classList.add("form-open");
		this.noteTitle.style.display = "block";
		this.formButtons.style.display = "block";
	}

	closeForm(){
		this.form.classList.remove("form-open");
		this.noteTitle.style.display="none";
		this.noteText.style.display="none";
		this.noteTitle.value = "";
		this.noteText.value="";
	}

	openModal(event){
		if (event.target.matches('.toolbar-delete')) return;
		if (event.target.closest(".note")){
			this.modal.classList.toggle("open-modal");
			this.modalTitle.value = this.title;
			this.modalText.value = this.text;
		}
	}

	closeModal(event){
		this.editNote();
		this.modal.classList.toggle("open-modal")
	}

	openToolTip(event){
		if(!event.target.matches(".toolbar-color")) return;
		this.id = event.target.nextElementSibling.dataset.id;
		const noteCoords = event.target.getBoundingClientRect();
		const horizontal = noteCoords.left;
		const vertical = window.scrollY - 20;
		this.colorToolTip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
		this.colorToolTip.style.display = "flex";
	}

	closeToolTip(event) {
		if (!event.target.matches(".toolbar-color")) return;
		this.colorToolTip.style.display = "none";
	}


	render() {
		this.saveNotes();
		this.displayNotes();
	}

	editNote() {
		const title = this.modalTitle.value;
		const text = this.modalText.value;
		this.notes = this.notes.map(note =>
			note.id === Number(this.id) ? { ...note, title, text } : note
		);
		this.render();
	}

	addNote({title,text}){
	const newNote = {
		title,
		text,
		color:"white",
		id:notes.length > 0 ? notes[notes.length - 1].id + 1 : 1
	};
	this.notes = [...this.notes,newNote]
	this.render();
	this.closeForm();
	}

	editNoteColor(color) {
		this.notes = this.notes.map(note =>
			note.id === Number(this.id) ? { ...note, color } : note
		);
		this.render();
	}

	selectNote(event) {
		console.log("ty")
		const selectedNote = event.target.closest(".note");
		if (!selectedNote) return;
		const [noteTitle, noteText] = selectedNote.children;
		this.title = noteTitle.innerText;
		this.text = noteText.innerText;
		this.id = selectedNote.dataset.id;
	}
	
	deleteNote(event) {
		event.stopPropagation();
		if (!event.target.matches('.toolbar-delete')) return;
		const id = event.target.dataset.id;
		this.notes = this.notes.filter(note => note.id !== Number(id));
		this.render();
	}


	displayNotes() {
		const hasNotes = this.notes.length > 0;
		console.log(hasNotes,typeof this.notes);
		this.placeholder.style.display = hasNotes ? "none" : "flex";
	
		this.$notes.innerHTML = this.notes
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
				  } class="toolbar-delete" src="https://www.flaticon.com/free-icon/delete_1214428?term=delete&page=1&position=1&page=1&position=1&related_id=1214428&origin=tag">
				</div>
			  </div>
			</div>
		 `
		  )
		  .join("");
	  }
	

	saveNotes(){
		localStorage.setItem('notes',JSON.stringify(this.notes))
	}


}

new App();