import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectFormComponent } from './project-form/project-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projectForm', component: ProjectFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
