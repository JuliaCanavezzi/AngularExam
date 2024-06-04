import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AuthorComponent } from './component/author/author.component';
import { BookComponent } from './component/book/book.component';

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
