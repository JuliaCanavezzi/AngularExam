import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Author', component: AuthorComponent},
  {path: 'Book', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
