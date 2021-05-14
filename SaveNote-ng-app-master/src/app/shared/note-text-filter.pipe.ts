import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../notes/model/Note';

@Pipe({
  name: 'noteTextFilter'
})
export class NoteTextFilterPipe implements PipeTransform {

  transform(notes: Note[], text: string): Note[] 
  {
    if(text == null || text === "")
    {
      return notes;
    }
    return notes.filter(note => note.title.includes(text) || note.text.includes(text));
  }
}
