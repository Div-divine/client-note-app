import {Note} from './note.js';

export class NoteManager{

        static async list(){
            const response  = await fetch('http://localhost:3000/notes');
            const data = await response.json();
            return data.map(obj => new Note(obj.id, obj.text));
    
        }

        static async listOne(id){
            const response  = await fetch('http://localhost:3000/notes/' + id);
            const data = await response.json();
            return data.map(obj => obj.text);
    
        }

        static async create(note) {
            const response = await fetch('http://localhost:3000/notes', {
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(note)
            });
        }  
        
        static async remove(id) {
            const response = await fetch('http://localhost:3000/notes/' + id, {
                method : "DELETE",
                headers : {
                    "content-type" : "application/json"
                },
            });
        }    
        static async update(id, updateData) {
            const response = await fetch('http://localhost:3000/notes/' + id, {
                method : "PUT",
                headers : {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(updateData)
            });
        }       
    }
