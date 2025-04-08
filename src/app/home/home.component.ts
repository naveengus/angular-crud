import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectApiService } from '../service/project-api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    // private dialogRef: MatDialogRef<HomeComponent>,
    private projectService: ProjectApiService
  ) {}

  projectList: any[] = [];

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projectList = res;
      },
      error: (err) => {
        console.log('Error fetching projects:', err);
        alert('Failed to load projects. Please try again.');
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: true,
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getProjects();
      }
    });
  }

  onEdit(id: string) {
    this.projectService.getprojectId(id).subscribe({
      next: (projectData) => {
        const dialogRef = this.dialog.open(ProjectFormComponent, {
          width: '600px',
          maxHeight: '90vh',
          disableClose: true,
          panelClass: 'custom-dialog',
          data: projectData,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result == 'success') {
            this.getProjects();
          }
        });
      },
      error: (err) => {
        console.log('Error fectching data', err);
      },
    });
  }

  onDelete(id: string) {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        alert('delete project successfully');
        this.getProjects();
      },
      error: (err) => {
        console.error('Error deleting project:', err);
      },
    });
  }
}
