function runfunction(){
	console.log("a")
	displayNotes()
}

let notes = JSON.parse(localStorage.getItem('notes')) || []; 
let title = ""
let text = ""
let id = ""
let form = document.querySelector("#form");
let notesDisplay = document.querySelector("#notes");
let noteTitle = document.querySelector("#note-title")
let noteText = document.querySelector("#note-text")
let formButtons = document.querySelector("#form-btns")
let formCloseButton = document.querySelector("#form-close-btn")
let modal = document.querySelector(".modal")
let modalTitle = document.querySelector(".modal-title")
let modalText = document.querySelector(".modal-text")
let modalCloseButton = document.querySelector(".modal-close-btn")
let colorToolTip = document.querySelector("#color-tool-tip");
let placeholder = document.querySelector("#placeholder")
// formButtons.addEventListener("mouseout",event=>{
// 	event.preventDefault()
// 	console.log("Afasfs")
// })

// formButtons.addEventListener('click',function(){
// 	console.log(notes.length);
// })

form.addEventListener("submit",event => {
	event.preventDefault()
	// console.log("siubmit")
	const title = noteTitle.value;
	const text = noteText.value;
	console.log("title",title);
	console.log("text",text)
	const hasNote = title || text;
	if(hasNote){
		addNote({title,text})
	}
})

function displayNotes(){
	const hasNotes = notes.length > 0;
	placeholder.style.display = hasNotes ? "none" : "flex";
	notesDisplay.innerHTML = notes.map(note =>{
		`
			<div style="background: ${note.color};" class="note data-id="${note.id}">
				<div class="${note.title && "note-title"}">${note.title}</div>
				<div class="note-text">${note.text}</div>
				<div class="toolbar-container">
					<div class="toolbar">
						<img class="toolbase-color" data-id=${note.id} src="https://icon.now.sh/palette>
						<img data-id=${note.id} class="toolbar-delete" src="https://icon.now.sh/delete">
					</div>
				</div>
			</div>
		`
	}).join("")
}

function render(){
	saveNotes();
	displayNotes();
}

function saveNotes(){
	localStorage.setItem('notes',JSON.stringify(notes))
}

function addNote({title,text}){
	const newNote = {
		title,
		text,
		color:"white",
		id:notes.length > 0 ? notes[notes.length - 1].id + 1 : 1
	};
	notes = [...notes,newNote]
	render();
}

