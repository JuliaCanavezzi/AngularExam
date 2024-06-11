import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Author } from '../../interface/author';
import { Book } from '../../interface/book';
import { AuthorService } from '../../service/author.service';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrayAuthor: Author[] = [];
  arrayBook: Book[] = [];
  homeFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private bookService: BookService
  ) {
    this.homeFormGroup = formBuilder.group({
      bookId: [''],
      authorId: ['']
    })
  }

  ngOnInit(): void {
    this.loadAuthor();
    this.loadBook()
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

  getBook(bookId: number): Book | undefined {
    return this.arrayBook.find(b => b.id == bookId);
  }

  getAuthor(authorId: number): Author | undefined {
    return this.arrayAuthor.find(a => a.id == authorId);
  }
}
