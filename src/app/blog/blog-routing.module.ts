import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectViewComponent } from './project-view/project-view.component';
import { AllProjectComponent } from './all-project/all-project.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { path: '', component: AllProjectComponent },
      { path: 'AllProject', component: AllProjectComponent },
      { path: 'projectView', component: ProjectViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
