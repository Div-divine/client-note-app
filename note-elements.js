export class NoteElements {
    static create(note){
            const noteElem = document.createElement('li');
            //noteElem.innerText = note.text;
            noteElem.innerHTML = ` ${note.text} - <button class= "btn-dlt" data-id="${note.id}">X</button> - <button class="btn-update" data-id= "${note.id}">Update</button>`;
            return noteElem;
    }
}