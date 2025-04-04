import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { ProjectViewComponent } from './project-view/project-view.component';
import { AllProjectComponent } from './all-project/all-project.component';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [
    ProjectViewComponent,
    AllProjectComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
