import { BookService } from './../../service/book.service';
import { Book } from './../../interface/book';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  arrayBook: Book[] = [];
  bookFormGroup : FormGroup;

  isEditing: boolean = false

  constructor(private formBuilder : FormBuilder,
             private bookService: BookService
  ){
    this.bookFormGroup = formBuilder.group({
      id: [''],
      title: [''],
      nameauthor: [''],
      synopsis: [''],
      date: [''],
      genre: ['']
    });
  }

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook() {
    this.bookService.getBook().subscribe({
      next: data => this.arrayBook = data,
    });
  }

  submit() {
    if (this.isEditing) {
      this.bookService.modify(this.bookFormGroup.value).subscribe({
        next: () => {
          this.loadBook();
          this.isEditing = false;
          this.bookFormGroup.reset();
        },
      });
    } else {
      this.bookService.save(this.bookFormGroup.value).subscribe({
        next: data => {
          this.arrayBook.push(data);
          this.bookFormGroup.reset();
        },
      });
    }
  }

  delete(variable: Book) {
    this.bookService.delete(variable).subscribe({
      next: () => this.loadBook(),
    });
  }

  update(variable: Book) {
    this.isEditing = true;
    this.bookFormGroup.setValue(variable);
  }
}
