import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from '../service/project-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  project: any = {};
  constructor(
    private projectService: ProjectApiService,
    private routeId: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeId.params.subscribe((data) => {
      const id: string = data['id'];
      this.getPoject(id);
    });
  }
  getPoject(id: string) {
    this.projectService.getprojectId(id).subscribe({
      next: (res) => {
        this.project = res;
      },
      error: (err) => {
        console.log('Error fetching data', err);
      },
    });
  }
}
