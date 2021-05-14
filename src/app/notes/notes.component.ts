import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteBook } from './model/notebook';
import { Note } from './model/Note';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notebooks: NoteBook[] = [];
  notes: Note[] = [];
  selectedNotebook : NoteBook;
  searchText : string = "";

  constructor(private apiService: ApiService) {

   }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
       // alert("Error has occurred")
      }
    );
  }

  createNotebook() 
  {
    let newNotebook:NoteBook = {
      name:'New Notebook',
      id:null,
      nbOfNotes: 0
    };
    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        alert("An error has occurred while saving the notebook");
      }
    );
  }


  updateNotebook(updatedNotebook: NoteBook) {
    this.apiService.postNotebook(updatedNotebook).subscribe(
      res => {
      },
      err => {
        alert("An error has occurred while Updating the notebook");
      }
    );
  }

  deleteNotebook(notebook: NoteBook) {
    if(confirm("Are you sure you want to delete the notebook?"))
    {
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook,1);
        },
        err => {
          alert("could not delete notebook");
        }
      );
    }
  }

  getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res;
        console.log()
      },
      err => {
        alert('Error occurred while downloading the notes;');
      }
    );
  }

  selectNotebook(notebook: NoteBook) {
    this.selectedNotebook = notebook;
    this.apiService.getNotesByNotebook(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      err=> {
        alert('An error has occurred');
      }
    );
    //TODO grab all the notes for this notebook only
  }


  createNote(notebookId: String)
  {
    let newNote : Note = {
      id: null,
      text: 'Write some text in here',
      title: 'New Note',
      lastModifiedOn: null,
      notebookId: notebookId
    };
    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      error => {
        alert('Error Occured while saving a note');
      }
    );
  }

  updateNote(updatedNote: Note)
  {
    this.apiService.saveNote(updatedNote).subscribe(
      res => {
      },
      error => {
        alert('Error Occured while saving a note');
      }
    );
  }


  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }

  deleteNote(note: Note) 
  {
    if(confirm("Are you sure want to delete this note?"))
    {
      this.apiService.deleteNote(note.id).subscribe(
        res => {
            let indexOfNote = this.notes.indexOf(note);
            this.notes.splice(indexOfNote,1);
        },
        err => {
          alert("Error occurred in deleting a note");
        }     
      );
    }
  }

 
}
