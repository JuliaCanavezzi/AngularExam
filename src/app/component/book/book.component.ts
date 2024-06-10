import { BookService } from './../../service/book.service';
import { AuthorService } from '../../service/author.service';
import { Book } from './../../interface/book';
import { Author } from '../../interface/author';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  arrayAuthor: Author[] = [];
  arrayBook: Book[] = [];
  bookFormGroup : FormGroup;

  isEditing: boolean = false
  submitted : boolean = false

  constructor(private formBuilder : FormBuilder,
             private bookService: BookService,
             private authorService: AuthorService,
  ){
    this.bookFormGroup = formBuilder.group({
      id: [''],
      title: [''],
      authorId: [''],
      synopsis: [''],
      date: [''],
      genre: ['']
    });
  }

  ngOnInit(): void {
    this.loadBook();
    this.loadAuthor();
  }

  loadBook() {
    this.bookService.getBook().subscribe({
      next: data => this.arrayBook = data,
    });
  }

  loadAuthor() {
    this.authorService.getAuthor().subscribe({
      next: data => this.arrayAuthor = data,
    });
  }

  submit() {
    this.submitted = true;

    if (this.bookFormGroup.valid) {
      if (this.isEditing) {
        this.bookService.modify(this.bookFormGroup.value).subscribe({
          next: () => {
            this.loadBook();
            this.isEditing = false;
            this.submitted = false;
            this.bookFormGroup.reset();
          },
        });
      } else {
        this.bookService.save(this.bookFormGroup.value).subscribe({
          next: data => {
            this.arrayBook.push(data);
            this.bookFormGroup.reset();
            this.submitted = false;
          },
        });
      }
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

  getAuthorName(authorId: number): Author | undefined {
    return this.arrayAuthor.find(a => a.id === authorId);
  }

  compareAuthors(author1: Author, author2: Author): boolean {
    return author1 && author2 ? author1.id === author2.id : author1 === author2;
  }

  get authorId(): any {
    return this.bookFormGroup.get('authorId')
  }
}


