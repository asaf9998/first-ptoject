loadNotes();



function saveToLocalStorage (notes) {
    const str = JSON.stringify(notes);
    localStorage.setItem('notes',str );
}

function getNotesFromLocalStorage () {
    const notesJSON = localStorage.getItem('notes');
    if(notesJSON !== null){
        return JSON.parse(notesJSON);
    }else{
        return [];
    }
}

function loadNotes() {
    const notes = getNotesFromLocalStorage();
    let notesElement = document.getElementById('notes');
    let innerHTML = '';
    for (const note of notes) {
        const index = notes.indexOf(note);
        innerHTML += `
            <div class="bg-container">
                <div class="note">
                <div class="icon-left"> 
                    <i class="fa-solid fa-trash trash" onclick="removeNotes(${index})"></i>
                </div>
                <p class="note-content">${note.content}</p>
                    <span class="note-date">${note.date}</span>
                    <br>
                    <span class="note-time">${note.time}</span>
                </div>
            </div>
        `;
    }
    notesElement.innerHTML = innerHTML;

}

function removeNotes(index){
    let notes = getNotesFromLocalStorage();
    notes.splice(index,1);
    saveToLocalStorage(notes);
    loadNotes();
}

function addNote() {
    const content = document.getElementById('note-content');
    const date = document.getElementById('note-date');
    const time = document.getElementById('note-time');

    if(!validateForm()){
        return false;
    }

    let notes = getNotesFromLocalStorage();
    const note = {
        content:content.value,
        date:date.value,
        time:time.value
    }
    let index = notes.length;
    notes.push(note);
    saveToLocalStorage(notes);

    let notesArray = document.getElementsByClassName('bg-container');
    for( const note of notesArray){
        note.classList.remove('fade-in');
    }

    
    document.getElementById('notes').innerHTML += `
        <div class="bg-container fade-in">
            <div class="note">
                <div class="icon-left"> 
                    <i class="fa-solid fa-trash trash" onclick="removeNotes(${index})"></i>
                </div>
                <p class="note-content">${note.content}</p>
                <span class="note-date">${note.date}</span>
                <br>
                <span class="note-time">${note.time}</span>
            </div>
        </div>        
    `;

    resetForm();
}

function resetForm() {
    document.getElementById('note-content').value = '';
    document.getElementById('note-date').value = '';
    document.getElementById('note-time').value = '';
}

function validateForm() {
    const content = document.getElementById('note-content');
    const date = document.getElementById('note-date');
    const time = document.getElementById('note-time');

    if(date.value === ''){
        document.getElementById('date-error').innerText = 'Please enter a date';
        date.focus();
        return false;
    }else{
        document.getElementById('date-error').innerText = '';
    }

    if(time.value === ''){
        document.getElementById('time-error').innerText = 'Please enter a time';
        time.focus();
        return false;
    }else{
        document.getElementById('time-error').innerText = '';
    }

    if(content.value === ''){
        document.getElementById('content-error').innerText = 'Please enter a note';
        content.focus();
        return false;
    }else{
        document.getElementById('content-error').innerText = '';
    }
    return true;
}

