import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteBook } from '../notes/model/notebook';
import { FeedbackViewModel } from '../feedback/feedback.component';
import { Note } from '../notes/model/Note';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = window['configApiBaseURL'] + "/api"
  private ALL_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks\\all`;
  private SEND_FEEDBACK_URL = `${this.BASE_URL}\\feedback`;
  private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}\\notebooks`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks`;
  private All_NOTES_URL = `${this.BASE_URL}\\notes\\all`;
  private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}\\notes\\byNotebook\\`;
  private SAVE_UPDATE_NOTE_URL = `${this.BASE_URL}\\notes`;
  private DELETE_NOTE_URL = `${this.BASE_URL}\\notes\\`;

  constructor(private http: HttpClient) {

   }

   getAllNotebooks() : Observable<NoteBook[]> {
    return this.http.get<NoteBook[]>(this.ALL_NOTEBOOK_URL);
  }

  postFeedback(feedback : FeedbackViewModel) : Observable<any> {
    return this.http.post(this.SEND_FEEDBACK_URL, feedback);
  }

  postNotebook(notebook : NoteBook) : Observable<any> {
    return this.http.post(this.SAVE_UPDATE_NOTEBOOK, notebook);
  }

  deleteNotebook(id: String) : Observable<any> {
    return this.http.delete(this.DELETE_NOTEBOOK_URL+"/"+id);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.All_NOTES_URL);
  }

  getNotesByNotebook(notebookId : String) {
    return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL + notebookId);
  }

  saveNote(note : Note) : Observable<Note> {
    return this.http.post<Note>(this.SAVE_UPDATE_NOTE_URL,note);
  }

  deleteNote(id: String) : Observable<any>{
    return this.http.delete(this.DELETE_NOTE_URL+id);
  } 
}
