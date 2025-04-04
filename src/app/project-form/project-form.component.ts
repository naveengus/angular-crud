import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectApiService } from '../service/project-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    private projectService: ProjectApiService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data) {
      this.isEdit = true;
      this.projectForm.patchValue(this.data);
      this.populateFormArrays();
    }
  }

  initializeForm() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      Description: ['', Validators.required], // Lowercase for consistency
      Technologies: this.fb.array([], Validators.required),
      teamMembers: this.fb.array([], Validators.required),
      projectsLink: this.fb.array([], Validators.required),
    });
  }

  populateFormArrays() {
    this.data?.Technologies?.forEach((tech: string) =>
      this.Technologies.push(this.fb.control(tech, Validators.required))
    );
    this.data?.teamMembers?.forEach((member: string) =>
      this.teamMembers.push(this.fb.control(member, Validators.required))
    );
    this.data?.projectsLink?.forEach((link: string) =>
      this.projectsLink.push(this.fb.control(link, Validators.required))
    );
  }

  get Technologies(): FormArray {
    return this.projectForm.get('Technologies') as FormArray;
  }
  get teamMembers(): FormArray {
    return this.projectForm.get('teamMembers') as FormArray;
  }
  get projectsLink(): FormArray {
    return this.projectForm.get('projectsLink') as FormArray;
  }

  addField(array: FormArray) {
    array.push(this.fb.control('', Validators.required));
  }
  removeField(array: FormArray, index: number) {
    array.removeAt(index);
  }

  addTechnologies() {
    this.addField(this.Technologies);
  }
  removeTechnologies(index: number) {
    this.removeField(this.Technologies, index);
  }
  addTeamMembers() {
    this.addField(this.teamMembers);
  }
  removeTeamMembers(index: number) {
    this.removeField(this.teamMembers, index);
  }
  addProjectsLink() {
    this.addField(this.projectsLink);
  }
  removeProjectsLink(index: number) {
    this.removeField(this.projectsLink, index);
  }

  onSubmit() {
    if (this.projectForm.valid) {
      if (this.isEdit) {
        this.projectService
          .updateProject(this.data.id, this.projectForm.value)
          .subscribe({
            next: () => {
              alert('Project updated successfully');
              this.dialogRef.close('success');
            },
            error: (err) => {
              alert('Failed to update project. Try again.');
              console.error('Error updating project:', err);
            },
          });
      } else {
        this.projectService.createProject(this.projectForm.value).subscribe({
          next: () => {
            this.projectForm.reset();
            this.initializeForm(); // Resetting form including arrays
            alert('Project created successfully');
            this.dialogRef.close('success');
          },
          error: (err) => {
            alert('Failed to create project. Try again.');
            console.error('Error submitting form:', err);
          },
        });
      }
    } else {
      alert('Form is invalid. Please fill all required fields.');
    }
  }

  onView() {
    this.route.navigate(['Blog']);
    this.dialogRef.close('success');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
