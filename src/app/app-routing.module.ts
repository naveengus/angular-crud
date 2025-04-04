import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project-List/:id', component: ProjectListComponent },
  { path: 'projectForm', component: ProjectFormComponent },
  {
    path: 'Blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
