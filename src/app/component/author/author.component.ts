import { Component } from '@angular/core';
import { Author } from '../../interface/author';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  submitted : boolean = false;

  constructor(private formBuilder : FormBuilder,
              private authorService : AuthorService
  ){
    this.authorFormGroup = formBuilder.group({
      id: [''],
      fullname: ['',Validators.required],
      pseudonym: ['',Validators.required],
      born: ['',Validators.required],
      nationality: ['',Validators.required],
      award: [false,Validators.required]
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
    this.submitted = true;

    if (this.authorFormGroup.valid) {
      if (this.isEditing) {
        this.authorService.modify(this.authorFormGroup.value).subscribe({
          next: () => {
            this.loadAuthor();
            this.isEditing = false;
            this.submitted = false;
            this.authorFormGroup.reset();
          },
        });
      } else {
        this.authorService.save(this.authorFormGroup.value).subscribe({
          next: data => {
            this.arrayAuthor.push(data);
            this.authorFormGroup.reset();
            this.submitted = false;
          },
        });
      }
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

  get fullname(): any {
    return this.authorFormGroup.get('fullname');
  }

  get pseudonym(): any {
    return this.authorFormGroup.get('pseudonym');
  }

  get nationality(): any {
    return this.authorFormGroup.get('nationality');
  }

  get born(): any {
    return this.authorFormGroup.get('born');
  }

  get awarded(): any {
    return this.authorFormGroup.get('awarded');
  }
}
