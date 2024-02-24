'use strict';

import { NoteManager } from './note-manager.js';
import { NoteElements } from './note-elements.js';
import { Note } from './note.js';
// le modèle
let notes;
const minChars = 6;

const authors = [
  { name: "Arthur", surname: "Raimbaud" },
  { name: "Jules", surname: "Verne" }
];

const inputElem = document.getElementById('my-input');
const listElem = document.getElementById('list');
const errorMsg = document.getElementById('error-msg');
const form = document.getElementsByTagName('form')[0];

function updateCounter() {
  document.getElementById('count').innerText = notes.length;
}

function addNoteToModel() {
  // ajouter la nouvelle note dans
  notes.push(inputElem.value);
}

function addNoteToView() {
  // création de l'element d'affichage
  let newItem = document.createElement('li');
  newItem.innerText = inputElem.value;

  // ajouter dans l'arbre / DOM
  // on l'ajoute comme enfant de la liste
  listElem.appendChild(newItem);
}

function addNote() {
    addNoteToModel();
    addNoteToView();

}

function resetInput() {
  // reset du champs de saisie
  inputElem.value = '';
}

function isValid() {
  // vérifier validité de la saisie
  // au moins quatre caractères
  let valid = (inputElem.value.length >= minChars);
  return valid;
}

function showError() {
  errorMsg.style.display = 'block';
}

function hideError() {
  errorMsg.style.display = 'none';
}

inputElem.addEventListener('change', function (event) {
  if (isValid()) {
    hideError();
  } else {
    showError();
  }
});

// gérer la soumission du formulaire.
form.addEventListener('submit', async function (event) {

  // empêcher le rechargement de la page(comportement par défaut d'un form)
  event.preventDefault();
  if (isValid()) {
    const newNote = new Note(null, inputElem.value);
    await NoteManager.create(newNote);
    await refreshPage();
    //updateCounter();
    resetInput();
  }
});

listElem.addEventListener('click', async function (event) {
  const target = event.target;

  // Check if a delete button was clicked
  if (target.classList.contains('btn-dlt')) {
    const id = +target.getAttribute('data-id');
    await NoteManager.remove(id);
    await refreshPage();
  }

  // Check if an update button was clicked then add text listed into the input field
  if (target.classList.contains('btn-update')) {
    clickedUpdate = 1;
    const id = +target.getAttribute('data-id');
    console.log('Update button clicked with id:', id);
    inputElem.value = await listOne(id);
    inputElem.value = inputElem.value;
    await NoteManager.update(id, inputElem.value);
    await refreshPage();
  }
});

document.querySelector('#error-msg span').innerText = minChars;




async function refreshPage() {
  notes = await NoteManager.list();
  let noteElems = notes.map(note => NoteElements.create(note));

  // dans la vue on purge  la liste
  listElem.innerHTML = '';

  // Maintenant que le liste est vide ajouter , enfant par enfant
  noteElems.forEach(noteElem => listElem.appendChild(noteElem));
}

refreshPage();

async function listOne(id){
  const listOne = await NoteManager.listOne(id);
  return listOne;
  
}

listOne();



