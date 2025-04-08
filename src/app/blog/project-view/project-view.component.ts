import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from 'src/app/service/project-api.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
})
export class ProjectViewComponent implements OnInit {
  project: any = {};
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const id: string = data['id'];
      this.getDataID(id);
    });
  }

  getDataID(id: string) {
    this.projectService.getprojectId(id).subscribe((res) => {
      this.project = res;
    });
  }
}
