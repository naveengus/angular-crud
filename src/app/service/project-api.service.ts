import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectApiService {
  private apiUrl = 'https://66371218288fedf6937f5611.mockapi.io/projects';
  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, projectData);
  }
  getprojectId(projectId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${projectId}`);
  }
  updateProject(id: string, projectData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, projectData);
  }
  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${projectId}`);
  }
}
