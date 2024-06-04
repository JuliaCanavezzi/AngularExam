import { Component } from '@angular/core';
import { Book } from '../../interface/book';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  arrayBook: Book[] = [];
  bookFormGroup : FormGroup;

  constructor(private formBuilder : FormBuilder){
    this.bookFormGroup = formBuilder.group({
      id: [''],
      title: [''],
      nameauthor: [''],
      synopsis: [''],
      date: [''],
      genre: ['']
    });
  }

  save(){
    this.arrayBook.push(this.bookFormGroup.value);
  }
}
