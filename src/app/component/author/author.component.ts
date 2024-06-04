import { Component } from '@angular/core';
import { Author } from '../../interface/author';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorService } from '../../service/author.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {
  arrayAuthor: Author [] = [];
  authorFormGroup: FormGroup;

  isEditing : boolean = false;

  constructor(private formBuilder : FormBuilder,
              private authorService : AuthorService
  ){
    this.authorFormGroup = formBuilder.group({
      id: [''],
      fullname: [''],
      pseudonym: [''],
      born: [''],
      nationality: [''],
      award: [false]
    });
  }
  ngOnInit(): void {
    this.loadAuthor();
  }

  loadAuthor() {
    this.authorService.getAuthor().subscribe({
      next: data => this.arrayAuthor = data,
    });
  }

  submit() {
    if (this.isEditing) {
      this.authorService.modify(this.authorFormGroup.value).subscribe({
        next: () => {
          this.loadAuthor();
          this.isEditing = false;
          this.authorFormGroup.reset();
        },
      });
    } else {
      this.authorService.save(this.authorFormGroup.value).subscribe({
        next: data => {
          this.arrayAuthor.push(data);
          this.authorFormGroup.reset();
        },
      });
    }
  }

  delete(variable: Author) {
    this.authorService.delete(variable).subscribe({
      next: () => this.loadAuthor(),
    });
  }

  update(variable: Author) {
    this.isEditing = true;
    this.authorFormGroup.setValue(variable);
  }

  get awarded(): any {
    return this.authorFormGroup.get('awarded');
  }
}
